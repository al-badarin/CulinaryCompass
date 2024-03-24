import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: User | undefined;
  USER_KEY = '[user]';

  userSubscription: Subscription;

  // Check if user is logged in
  get isLoggedIn(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient, private router: Router) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  // REGISTER
  register(
    username: string,
    email: string,
    password: string,
    repeatPassword: string
  ) {
    return this.http.post<User>(`/api/register`, {
      username,
      email,
      password,
      repeatPassword,
    });
  }

  // LOGIN
  login(email: string, password: string) {
    return this.http
      .post<User>(`/api/login`, { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  // LOGOUT
  logout() {
    return this.http
      .post(`/api/logout`, {})
      .pipe(tap(() => this.user$$.next(undefined)));
  }

  // GET PROFILE
  getProfile() {
    return this.http
      .get<User>('/api/users/profile')
      .pipe(tap((user) => this.user$$.next(user)));
  }

  // UPDATE PROFILE
  updateProfile(username: string, email: string) {
    return this.http
      .put<User>('/api/users/profile', { username, email })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  // USER'S RECIPES
  getUserRecipesFromCookie(): Recipe[] {
    const userCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('user='));

    if (userCookie) {
      const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
      const userPosts: Recipe[] = userData.posts; // Assuming 'posts' contains the recipes
      return userPosts;
    } else {
      return [];
    }
  }

  // GET USER'S ID
  getUserId(): string | undefined {
    const userCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('user='));

    if (userCookie) {
      const jwt = userCookie.split('=')[1];
      const [, payloadBase64] = jwt.split('.');
      const payload = JSON.parse(atob(payloadBase64));
      const userId = payload.id;

      return userId;
    }

    return undefined;
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
