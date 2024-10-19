import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';

import { MatDialogModule } from '@angular/material/dialog';

import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { BoardComponent } from './board/board.component';
import { BoardDialogComponent } from './dialogs/board-dialog.component';
import { TaskDialogComponent } from './dialogs/task-dialog.component';
import { BoardsListComponent } from './boards-list/boards-list.component';

@NgModule({
  declarations: [
    BoardComponent,
    BoardDialogComponent,
    TaskDialogComponent,
    BoardsListComponent,
  ],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    SharedModule,
    FormsModule,
    DragDropModule,
    MatButtonToggleModule,
    MatDialogModule,
  ],
})
export class KanbanModule {}
