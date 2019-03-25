// contact-details.component.ts -- Ryan Watson -- 300920674 -- 03/25/19

import { Component, OnInit } from '@angular/core';
import { ContactListService } from 'src/app/services/contact-list.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  // Declare variables
  title: string;
  contact: Contact;

  // Constructor for imported modules
  constructor(private activatedRoute: ActivatedRoute, private flashMessage: FlashMessagesService,
              private contactListService: ContactListService, private router: Router) { }

  ngOnInit() {
    // Initialize variables
    this.title = this.activatedRoute.snapshot.data.title;
    this.contact = new Contact();

    // Get contact id from url params
    this.activatedRoute.params.subscribe(params => {
      this.contact._id = params.id;
    });

    // If user wants to edit contact, then get contact details and set to form fields
    if (this.title === 'Edit Contact') {
      this.getContact(this.contact);
    }
  }

  // Method to get contact details
  private getContact(contact: Contact): void {
    this.contactListService.getContact(contact).subscribe(data => {
      this.contact = data.contact;
    });
  }

  // Method for submitting the contact details form
  onDetailsPageSubmit(): void {
    switch (this.title) {
      // If the title is Add Contact, then call add contact method in service
      case 'Add Contact':
      this.contactListService.addContact(this.contact).subscribe(data => {
        if (data.success) {
          this.flashMessage.show('Contact has been added.', {cssClass: 'alert-success', timeOut: 3000});
          this.router.navigate(['/contact/contact-list']);
        } else {
          this.flashMessage.show('Contact was not added.', {cssClass: 'alert-danger', timeOut: 3000});
          this.router.navigate(['/contact/contact-list']);
        }
      });
      break;

      // If the title is Edit Contact, then call the edit contact method in service
      case 'Edit Contact':
      console.log(this.contact);
      this.contactListService.editContact(this.contact).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
          this.router.navigate(['/contact/contact-list']);
        } else {
          this.flashMessage.show('Contact was not edited.', {cssClass: 'alert-danger', timeOut: 3000});
          this.router.navigate(['/contact/contact-list']);
        }
      });
      break;
    }
  }

}
