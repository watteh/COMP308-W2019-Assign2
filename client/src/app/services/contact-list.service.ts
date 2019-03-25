// contact-list.service.ts -- Ryan Watson -- 300920674 -- 03/25/19

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Contact } from '../models/contact';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class ContactListService {
  // Declare variables
  private user: User;
  private authToken: any = null;

  // URI for backend
  private endpoint = 'http://localhost:3000/api/contact-list/';

  // Header options
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Oirigin, X-Requested-With, Content-Type, Accept'
    })
  };

  // Constructor for imported modules and to initialize user variable
  constructor(private http: HttpClient) {
    this.user = new User();
  }

  // Method for contact list endpoint
  public getList(): Observable<any> {
    this.loadToken();
    return this.http.get<any>(this.endpoint, this.httpOptions);
  }

  // Method for contact details endpoint
  public getContact(contact: Contact): Observable<any> {
    this.loadToken();
    return this.http.get<any>(this.endpoint + 'edit/' + contact._id, this.httpOptions);
  }

  // Method for adding a contact endpoint
  public addContact(contact: Contact): Observable<any> {
    this.loadToken();
    return this.http.post<any>(this.endpoint + 'add', contact, this.httpOptions);
  }

  // Method for editing a contact endpoint
  public editContact(contact: Contact): Observable<any> {
    this.loadToken();
    return this.http.post<any>(this.endpoint + 'edit/' + contact._id, contact, this.httpOptions);
  }

  // Method for deleting a contact endpoint
  public deleteContact(contact: Contact): Observable<any> {
    this.loadToken();
    return this.http.get<any>(this.endpoint + 'delete/' + contact._id, this.httpOptions);
  }

  // Method to load authorization token
  private loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
  }
}
