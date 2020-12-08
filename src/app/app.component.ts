import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loggedIn: boolean;

  constructor( private authService: AuthService ) {
  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe(( loggedIn: boolean ) => {
      this.loggedIn = loggedIn;
    });
    this.authService.checkAuth().subscribe(() => {});
  }
}
