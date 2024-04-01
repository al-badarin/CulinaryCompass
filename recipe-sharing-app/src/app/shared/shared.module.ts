import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlicePipe } from './pipes/slice.pipe';
import { LoaderComponent } from './loader/loader.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SlicePipe, LoaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [SlicePipe, LoaderComponent],
  // providers: [LoaderComponent]
})
export class SharedModule {}
