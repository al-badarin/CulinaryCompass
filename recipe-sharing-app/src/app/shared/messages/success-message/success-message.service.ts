import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuccessMessageService {
  private showMessageSubject = new BehaviorSubject<boolean>(false);
  showMessage$ = this.showMessageSubject.asObservable();

  constructor() {}
  showSuccessMessage(): void {
    this.showMessageSubject.next(true);
    setTimeout(() => {
      this.showMessageSubject.next(false);
    }, 5000); // Hide message after 5 seconds
  }
}
