// contact.component.ts -- Ryan Watson -- 300920674 -- 02/06/19

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  // Declaring variables
  title = `Contact Watson Innovation`;
  fName: string;
  lName: string;
  number: string;
  email: string;
  message: string;

  // Constructor for imported modules
  constructor(route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
  }

  // Method to process form data and create an alert on the page; once okay is clicked, redirects to home page
  processForm() {
    const allInfo = `${this.fName} ${this.lName} at email ${this.email} and #${this.number} says "${this.message}"`;
    alert(allInfo);
    window.location.href = '/';
  }

  // Method to check if user is logged in or not
  isLoggedIn(): boolean {
    return this.authService.loggedIn();
  }

}
