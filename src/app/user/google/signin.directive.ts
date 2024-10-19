import { Directive, HostListener } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

@Directive({
  selector: '[appSignin]',
})
export class SigninDirective {
  constructor(private auth: Auth) {}

  @HostListener('click')
  async onClick() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, provider);
  }
}
