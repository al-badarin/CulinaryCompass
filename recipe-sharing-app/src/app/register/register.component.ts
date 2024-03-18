import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

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

  constructor(private authService: AuthService) {}

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
      },
      (error) => {
        console.error('Registration error:', error);
      }
    );
  }
}
