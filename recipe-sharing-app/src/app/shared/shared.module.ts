import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlicePipe } from './pipes/slice.pipe';

@NgModule({
  declarations: [SlicePipe],
  imports: [CommonModule],
  exports: [SlicePipe],
})
export class SharedModule {}
