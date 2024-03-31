import { Component, OnInit } from '@angular/core';
import { SuccessMessageService } from './success-message.service';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css'],
})
export class SuccessMessageComponent implements OnInit {
  showMessage: boolean = false;

  constructor(private successMessageService: SuccessMessageService) { }

  ngOnInit(): void {
    this.successMessageService.showMessage$.subscribe(show => {
      this.showMessage = show;
    });
  }
}