import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  registerUser() {
    if (this.password !== this.repeatPassword) {
      console.error('Passwords do not match');
      return;
    }

    const newUser = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.authService.register(newUser).subscribe(
      (response) => {
        console.log('Registration successful!', response);
        this.router.navigateByUrl('/login');
      },
      (error) => {
        console.error('Registration error:', error);
      }
    );
  }
}
