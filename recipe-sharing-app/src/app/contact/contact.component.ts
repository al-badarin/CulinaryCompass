import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  contactForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      message: ['', Validators.required],
    });
  }

  // !ONLY SIMULATING THE BEHAVIOUR OF SUBMITTING A CONTACT FORM
  onSubmit() {
    if (this.contactForm.valid) {
      console.log('message data: ', this.contactForm.value);
      this.router.navigate(['/home']);
    } else {
      console.error('Error sending message form:');
      this.errorMessage =
        'An error occurred during sending message form. Please try again.';
    }
  }
}
