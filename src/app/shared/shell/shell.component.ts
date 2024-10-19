import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Auth, authState } from '@angular/fire/auth';
@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  isHandset$: Observable<boolean> | undefined;
  authState$: Observable<any>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: Auth
  ) {
    this.authState$ = authState(this.auth);
  }
  ngOnInit() {
    this.isHandset$ = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(
        map((result) => result.matches),
        shareReplay()
      );
  }
}
