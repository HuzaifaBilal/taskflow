import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth'; // Import the new Auth service
import {
  Firestore,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  arrayRemove,
  writeBatch,
} from '@angular/fire/firestore'; // Import Firestore functions
import { Board, Task } from './board.model';
import { Observable, Subscriber } from 'rxjs';
import { onSnapshot, QuerySnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  /**
   * Creates a new board for the current user
   */
  async createBoard(data: Board): Promise<void> {
    const user = await this.getCurrentUser();
    if (user) {
      const newBoard: Board = {
        ...data,
        uid: user.uid,
      };

      await addDoc(collection(this.firestore, 'boards'), newBoard);
    }
  }

  getUserBoards(): Observable<Board[]> {
    return new Observable<Board[]>((observer) => {
      const unsubscribeAuth = onAuthStateChanged(this.auth, (user) => {
        if (user) {
          const boardsRef = query(
            collection(this.firestore, 'boards'),
            where('uid', '==', user.uid),
            orderBy('priority')
          );

          // Set up a real-time listener using onSnapshot
          const unsubscribeSnapshot = onSnapshot(
            boardsRef,
            (snapshot: QuerySnapshot) => {
              const boards = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })) as Board[];
              observer.next(boards);
            }
          );

          return () => {
            unsubscribeSnapshot();
            unsubscribeAuth();
          };
        } else {
          observer.next([]);
          return () => unsubscribeAuth();
        }
      });
    });
  }

  /**
   * Run a batch write to change the priority of each board for sorting
   */
  async sortBoards(boards: Board[]): Promise<void> {
    const batch = writeBatch(this.firestore);
    boards.forEach((board, idx) => {
      if (board.id) {
        const boardRef = doc(this.firestore, 'boards', board.id);
        batch.update(boardRef, { priority: idx });
      }
    });
    await batch.commit();
  }

  /**
   * Delete board
   */
  async deleteBoard(boardId: string): Promise<void> {
    const boardRef = doc(this.firestore, 'boards', boardId);
    await deleteDoc(boardRef);
  }

  /**
   * Updates the tasks on the board
   */
  async updateTasks(boardId: string, tasks: Task[]): Promise<void> {
    const boardRef = doc(this.firestore, 'boards', boardId);
    await updateDoc(boardRef, { tasks });
  }

  /**
   * Remove a specific task from the board
   */
  async removeTask(boardId: string, task: Task): Promise<void> {
    const boardRef = doc(this.firestore, 'boards', boardId);
    await updateDoc(boardRef, {
      tasks: arrayRemove(task),
    });
  }

  /**
   * Get the current authenticated user
   */
  private async getCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
      resolve(this.auth.currentUser);
    });
  }
}
