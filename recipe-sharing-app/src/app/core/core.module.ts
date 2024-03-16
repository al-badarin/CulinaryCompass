import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [HomeComponent, FooterComponent, NavbarComponent],
  imports: [CommonModule],
  exports: [HomeComponent, FooterComponent, NavbarComponent],
})
export class CoreModule {}
