import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

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
    return this.http.post<any>(`${this.baseUrl}/logout`, {});
  }

  getProfileInfo(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/profile`);
  }

  editProfileInfo(data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/profile`, data);
  }
}
