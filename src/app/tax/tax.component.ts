import { Component, OnInit } from '@angular/core';
import { PayrollService } from '../payroll.service';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css'],
  providers: [PayrollService]
})
export class TaxComponent implements OnInit {

  inputID: string = "";

  stringInvalid: boolean = true;

  constructor(private payroll: PayrollService) { }

  ngOnInit() {
  }

  checkIDString(input: string){
    // Validation input
    // Input must be a 5 digit number starting with a 1.
    let reg = /[1-9][0-9]{4}/
    let expFound = reg.test(input);

    try {
      if( input.length === 5 && expFound){
        this.stringInvalid = false;
      }
      else if(input.length !== 5 || !expFound) {
        this.stringInvalid = true;
      }
    }
    catch(err) {
      this.stringInvalid = true;
      console.log("Input string is invalid");
    }

  }

  generateW2() {
    ;
  }
}
