import { Component, OnInit } from '@angular/core';
import { PayrollService } from '../payroll.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [PayrollService]
})
export class UserComponent implements OnInit {

  input: string = "";
  stringIsEmpty: boolean = true;

  user = {};

  constructor(private payroll: PayrollService) { }

  ngOnInit() {
  }

  checkString(input: string){
    // Validation input
    // Input must be a 5 digit number starting with a 1.
    let reg = /[1-9][0-9]{4}/
    let expFound = reg.test(input);

    try {
      if( input.length === 5 && expFound){
        this.stringIsEmpty = false;
      }
      else if(input.length !== 5 || !expFound) {
        this.stringIsEmpty = true;
      }
    }
    catch(err) {
      this.stringIsEmpty = true;
      console.log("Input string is invalid");
    }

  }

  onUserSearch() {
    this.payroll.user(this.input).subscribe(response => { 
      try {
        this.user = response[0];
        this.input = "";
      }
      catch(err) {
        window.alert("Invalid uID entered.");
      }
    });
  };

}
