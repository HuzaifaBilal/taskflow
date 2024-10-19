import { Component } from '@angular/core';
import { Auth, authState, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  authState$: Observable<any>;

  constructor(private auth: Auth) {
    this.authState$ = authState(this.auth);
  }
  logOut() {
    signOut(this.auth);
  }
}
