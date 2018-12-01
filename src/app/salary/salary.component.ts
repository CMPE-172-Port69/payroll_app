import { Component, OnInit } from "@angular/core";
import { PayrollService } from "../payroll.service";

@Component({
  selector: "app-salary",
  templateUrl: "./salary.component.html",
  styleUrls: ["./salary.component.css"],
  providers: [PayrollService]
})
export class SalaryComponent implements OnInit {
  inputID: string = "";
  stringInvalid: boolean = true;

  salaries: any;
  dateNow: any;

  constructor(private payroll: PayrollService) {}

  ngOnInit() {}

  checkIDString(input: string) {
    // Validation input
    // Input must be a 5 digit number starting with a 1.
    let reg = /[1-9][0-9]{4}/;
    let expFound = reg.test(input);

    try {
      if (input.length === 5 && expFound) {
        this.stringInvalid = false;
      } else if (input.length !== 5 || !expFound) {
        this.stringInvalid = true;
      }
    } catch (err) {
      this.stringInvalid = true;
      console.log("Input string is invalid");
    }
  }

  onIDSearch() {
    this.payroll.salaryHistory(this.inputID).subscribe(response => {
      try {
        this.salaries = response;
        this.inputID = "";
      } catch (err) {
        window.alert("Invalid uID entered.");
      }
    });
  }

  getDate() {
    var today = new Date();

    var utcDate = new Date(
      Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        today.getHours(),
        today.getMinutes(),
        today.getSeconds(),
        today.getMilliseconds()
      )
    );

    this.dateNow = utcDate.toISOString();
  }
}
