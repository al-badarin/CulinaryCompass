import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { matchPasswordsValidator } from 'src/app/shared/validators/match-passwords-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ],
    ],
    passGroup: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(5)]],
        repeatPassword: ['', [Validators.required]],
      },
      {
        validators: [matchPasswordsValidator('password', 'repeatPassword')],
      }
    ),
  });

  errorMessage: string = '';
  hasError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  register(): void {
    if (this.form.invalid) {
      this.errorMessage = 'Please fill out all required fields correctly.';
      return;
    }

    const { 
      username,
      email,
      passGroup: { password, repeatPassword } = {},
    } = this.form.value;

    this.authService
      .register(username!, email!, password!, repeatPassword!)
      .subscribe(
        (response) => {
          console.log('Registration successful!', response);
          this.authService.user$$.next(response);
          this.router.navigateByUrl('/home');
        },
        (error) => {
          this.hasError = true;
          console.error('Registration error:', error);
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage =
              'An error occurred during registration. Please try again.';
          }
        }
      );
  }
}
