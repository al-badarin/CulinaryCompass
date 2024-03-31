import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlicePipe } from './pipes/slice.pipe';
import { LoaderComponent } from './loader/loader.component';
import { SuccessMessageComponent } from './messages/success-message/success-message.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SlicePipe, LoaderComponent, SuccessMessageComponent],
  imports: [CommonModule, RouterModule],
  exports: [SlicePipe, LoaderComponent, SuccessMessageComponent],
  // providers: [LoaderComponent]
})
export class SharedModule {}
