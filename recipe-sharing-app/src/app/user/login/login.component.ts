import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorMessage: string = '';
  hasError = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value;

    this.authService.login(email, password).subscribe(
      (response) => {
        console.log('Login successful!', response);
        this.router.navigateByUrl('/home');
      },
      (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'Invalid email or password. Please try again.';
        this.hasError = true;
      }
    );
  }
}
