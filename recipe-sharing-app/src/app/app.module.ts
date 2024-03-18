import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { CoreModule } from './core/core.module';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RecipeDetailsComponent,
    RecipeListComponent,
    AboutComponent,
    ContactComponent,
    ErrorPageComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
