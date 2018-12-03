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
  mostRecentSalary: any;
  salaries: any;
  employee: any;

  search: boolean = false;

  bracket: number;
  taxes: {
    incomeTax: any,
    ssTax: any,
    medicareTax
  }


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
    this.payroll.user(this.inputID).subscribe(response => {
      this.employee = response[0];
      console.log(response);
    });

    this.payroll.salaryHistory(this.inputID).subscribe(response => {
      console.log(JSON.stringify(response));
      this.salaries = response;
      this.mostRecentSalary = this.salaries[this.salaries.length - 1];

      this.getBracket();
    });

    this.search = true;
    this.getBracket();
  }

  getBracket() {
    let salary = this.mostRecentSalary.salary;
    salary = parseInt(salary);

    let brackets = [
      {amount: 0 , percent: .10},
      {amount: 9525 , percent: .12},
      {amount: 38700 , percent: .22},
      {amount: 82500 , percent: .24},
      {amount: 157500 , percent: .32},
      {amount: 200000 , percent: .35},
      {amount: 500000, percent: .37}
  ]
    if(salary < brackets[1].amount) {
      this.bracket = brackets[0].percent;
    }
    else if(salary < brackets[2].amount) {
      this.bracket = brackets[1].percent;
    }
    else if(salary < brackets[3].amount) {
      this.bracket = brackets[2].percent;
    }
    else if(salary < brackets[4].amount) {
      this.bracket = brackets[3].percent;
    }
    else if(salary < brackets[5].amount) {
      this.bracket = brackets[4].percent;
    }
    else if(salary < brackets[6].amount) {
      this.bracket = brackets[5].percent;
    }
    else {
      this.bracket = brackets[6].percent;
    }
    this.taxes.incomeTax = salary * this.bracket;
  }
}
