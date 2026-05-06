import { Component, OnInit } from '@angular/core';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';
import { BaseCtl } from '../base.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent extends BaseCtl implements OnInit {

  // 🔴 Error messages
  errorMessageAccountCode: string = '';
  errorMessageUserName: string = '';

  // 🔽 Dropdowns
  accountTypeList: any = {};
  statusList: any = {};

  constructor(
    public locator: ServiceLocatorService,
    public route: ActivatedRoute,
    private http: HttpClient
  ) {
    super(locator.endpoints.ACCOUNT, locator, route);
  }


  // ✅ Form Validation
  validateForm(form) {
    let flag = true;
    let validator = this.locator.dataValidator;

    flag = flag && validator.isNotNullObject(form.accountCode);
    flag = flag && validator.isNotNullObject(form.userName);
    flag = flag && validator.isNotNullObject(form.accountType);
    flag = flag && validator.isNotNullObject(form.status);

    return flag;
  }

  // ✅ Populate Form (Edit case)
  populateForm(form, data) {
    form.id = data.id;
    form.accountCode = data.accountCode;
    form.userName = data.userName;
    form.accountType = data.accountType;
    form.status = data.status;
  }

  // ✅ Account Code Validation (alphanumeric)
  validateAccountCode(event: KeyboardEvent): void {

    const inputChar = event.key;
    const pattern = /^[a-zA-Z0-9]*$/;

    if (!pattern.test(inputChar) && !['Backspace', 'Delete', 'Tab'].includes(inputChar)) {
      event.preventDefault();
      this.errorMessageAccountCode = 'Only alphanumeric allowed';
      return;
    }

    const inputValue = (event.target as HTMLInputElement).value;

    if (inputValue.length < 3) {
      this.errorMessageAccountCode = 'Minimum 3 characters required';
    } else if (inputValue.length > 20) {
      this.errorMessageAccountCode = 'Max 20 characters allowed';
    } else {
      this.errorMessageAccountCode = '';
    }
  }

  // ✅ UserName Validation (only alphabets)
  validateUserName(event: KeyboardEvent): void {

    const inputChar = event.key;
    const pattern = /^[A-Za-z ]*$/;

    if (!pattern.test(inputChar) && !['Backspace', 'Delete', 'Tab'].includes(inputChar)) {
      event.preventDefault();
      this.errorMessageUserName = 'Only alphabets allowed';
      return;
    }

    const inputValue = (event.target as HTMLInputElement).value;

    if (inputValue.length < 3) {
      this.errorMessageUserName = 'Minimum 3 characters required';
    } else if (inputValue.length > 50) {
      this.errorMessageUserName = 'Max 50 characters allowed';
    } else {
      this.errorMessageUserName = '';
    }
  }

}