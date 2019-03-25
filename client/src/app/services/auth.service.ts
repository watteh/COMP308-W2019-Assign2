// auth.service.ts -- Ryan Watson -- 300920674 -- 03/25/19

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Declare variables
  user: User;
  private authToken: any;

  // URI for backend
  private endpoint = 'http://localhost:3000/api/';

  // Header options
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Oirigin, X-Requested-With, Content-Type, Accept'
    })
  };

  // Constructor for imported modules and to initalize user variable
  constructor(private http: HttpClient, private jwtService: JwtHelperService) {
    this.user = new User();
   }

   // Method for user registration endpoint
   public registerUser(user: User): Observable<any> {
     return this.http.post<any>(this.endpoint + 'register', user, this.httpOptions);
   }

   // Method for user authentication endpoint
   public authenticateUser(user: User): Observable<any> {
     return this.http.post<any>(this.endpoint + 'login', user, this.httpOptions);
   }

   // Method to store user data
   public storeUserData(token: any, user: User): void {
     localStorage.setItem('id_token', 'Bearer ' + token);
     localStorage.setItem('user', JSON.stringify(user));
     this.authToken = token;
     this.user = user;
   }

   // Method for logout endpoint
   public logout(): Observable<any> {
     this.authToken = null;
     this.user = null;
     localStorage.clear();
     return this.http.get<any>(this.endpoint + 'logout', this.httpOptions);
   }

   // Method to check if user is logged in
   public loggedIn(): boolean {
     return !this.jwtService.isTokenExpired(this.authToken);
   }
}
