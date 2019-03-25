// contact-delete.component.ts -- Ryan Watson -- 300920674 -- 03/25/19

import { Component, OnInit } from '@angular/core';

import { ContactListService } from 'src/app/services/contact-list.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact-delete',
  templateUrl: './contact-delete.component.html',
  styleUrls: ['./contact-delete.component.css']
})
export class ContactDeleteComponent implements OnInit {
  // Create variables
  title: string;
  contact: Contact;

  // Constructor for modules
  constructor(private activatedRoute: ActivatedRoute, private flashMessage: FlashMessagesService,
              private contactListService: ContactListService, private router: Router) { }

  ngOnInit() {
    // Initialize variables
    this.title = this.activatedRoute.snapshot.data.title;
    this.contact = new Contact();

    // get contact id from url params
    this.activatedRoute.params.subscribe(params => {
      this.contact._id = params.id;
    });

    // call method to delete contact
    this.deleteContact(this.contact);
  }

  // Method to delete contact
  private deleteContact(contact: Contact): void {
    this.contactListService.deleteContact(contact).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Contact has been deleted.', {cssClass: 'alert-warning', timeOut: 3000});
        this.router.navigate(['/contact/contact-list']);
      } else {
        this.flashMessage.show('Contact was not deleted.', {cssClass: 'alert-danger', timeOut: 3000});
        this.router.navigate(['/contact/contact-list']);
      }
    });
  }

}
