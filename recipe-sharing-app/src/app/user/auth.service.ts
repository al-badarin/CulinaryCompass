import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api';

  // user: User | undefined;
  // USER_KEY = '[user]';

  constructor(private http: HttpClient, private router: Router) {}

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // ** IMPLEMENTED BY ME **
  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout(): Observable<any> {
    localStorage.removeItem('token');
    return this.http.post<any>(`${this.baseUrl}/logout`, {});
  } 

  getProfileInfo(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/profile`);
  }

  editProfileInfo(data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/profile`, data);
  }

  // *** IMPLEMENTED FROM WORKSHOP ***
  //...
}
