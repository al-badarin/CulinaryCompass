import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlicePipe } from './pipes/slice.pipe';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [SlicePipe, LoaderComponent],
  imports: [CommonModule],
  exports: [SlicePipe, LoaderComponent],
})
export class SharedModule {}
