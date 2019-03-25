// app.component.ts -- Ryan Watson -- 300920674 -- 02/06/19

import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Create User object
  user: User;
  // Constructor to use necessary imports
  constructor(private flashMessage: FlashMessagesService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // Initialize user object
    this.user = new User();
  }

  // Method for clicking logout button event
  onLogoutClick(): void {
    this.authService.logout().subscribe(data => {
      this.flashMessage.show(data.msg, {cssClass: 'alert-warning', timeOut: 5000});
      this.router.navigate(['/login']);
    });
  }

  // Method to check if user is logged in
  isLoggedIn(): boolean {
    const result = this.authService.loggedIn();
    if (result) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    return result;
  }
}
