import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | undefined;
  USER_KEY = '[user]';

  constructor(private http: HttpClient, private router: Router) {}

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  register(
    username: string,
    email: string,
    password: string,
    repeatPassword: string
  ) {
    return this.http.post<User>(`${this.baseUrl}/register`, {
      username,
      email,
      password,
      repeatPassword,
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    return this.http.post<User>(`${this.baseUrl}/logout`, {});
  }

  // TODO: !!
  // getProfileInfo(): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}/profile`);
  // }

  // editProfileInfo(data: any): Observable<any> {
  //   return this.http.put<any>(`${this.baseUrl}/profile`, data);
  // }
}
