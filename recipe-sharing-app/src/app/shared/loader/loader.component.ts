import { Component, OnDestroy } from '@angular/core';
import { LoaderService } from './loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnDestroy {
  isLoading: boolean = false;
  private subscription: Subscription;

  constructor(public loaderService: LoaderService) {
    this.subscription = this.loaderService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
