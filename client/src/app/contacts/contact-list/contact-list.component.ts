// contact-list.component.ts -- Ryan Watson -- 300920674 -- 03/25/19

import { Component, OnInit } from '@angular/core';
import { ContactListService } from 'src/app/services/contact-list.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  // Declare variables
  contacts: Contact[];

  // constructor for imported modules
  constructor(
    private contactListService: ContactListService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    // initialize variables
    this.contacts = new Array<Contact>();

    // Call method to display list of contacts
    this.displayContactList();
  }

  // Method for deleting a contact
  onDeleteClick(): void {
    if (!confirm('Are you sure?')) {
      this.router.navigate(['/contact/contact-list']);
    }
  }

  // Method for displaying list of contacts
  displayContactList(): void {
    this.contactListService.getList().subscribe(data => {
      if (data.success) {
        console.log(data);
        this.contacts = data.contactList;
      } else {
        this.flashMessage.show('User must be logged in.', {cssClass: 'alert-danger', timeOut: 3000});
      }
    });
  }

}
