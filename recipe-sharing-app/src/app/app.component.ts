import { Component } from '@angular/core';
import { LoaderService } from './shared/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-app-project';

  constructor(public loaderService: LoaderService) {}

  get isLoading(): boolean {
    return this.loaderService.isLoading;
  }

  // isLoading = false;

  // constructor(private spinnerService: SpinnerService) {
  //   this.spinnerService.isLoading$.subscribe((isLoading: boolean) => {
  //     this.isLoading = isLoading;
  //   });
  // }
}
