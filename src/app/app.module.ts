import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SearchComponent } from './search/search.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SalaryComponent } from './salary/salary.component';
import { TaxComponent } from './tax/tax.component';
import { RouterModule, Routes } from '@angular/router'

const appRoutes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'salary', component: SalaryComponent},
  { path: 'taxdocs', component: TaxComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SearchComponent,
    NavbarComponent,
    SalaryComponent,
    TaxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
