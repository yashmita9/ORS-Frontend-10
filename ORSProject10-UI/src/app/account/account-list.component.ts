import { Component, OnInit } from '@angular/core';
import { BaseListCtl } from '../base-list.component';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent extends BaseListCtl implements OnInit {

  // 🔴 Error messages
  errorMessageUserName: string = '';
  errorMessageAccountCode: string = '';

  // 🔽 Dropdown data
  accountTypeList: any = {};
  statusList: any = {};

  constructor(
    public locator: ServiceLocatorService,
    public route: ActivatedRoute,
    private httpClient: HttpClient
  ) {
    super(locator.endpoints.ACCOUNT, locator, route);
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
      this.errorMessageUserName = 'Maximum 50 characters allowed';
    } else {
      this.errorMessageUserName = '';
    }
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
      this.errorMessageAccountCode = 'Maximum 20 characters allowed';
    } else {
      this.errorMessageAccountCode = '';
    }
  }

}