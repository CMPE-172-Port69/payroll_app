import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { WindowComponent } from './window/window.component';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    WindowComponent,
    UserComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
