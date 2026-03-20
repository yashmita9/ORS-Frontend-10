import { Component, OnInit } from '@angular/core';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';
import { BaseCtl } from '../base.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent extends BaseCtl implements OnInit {

  errorMessageName: string;
  form: any;
  serviceLocator: any;
  productList = {};

  constructor(public locator: ServiceLocatorService, public route: ActivatedRoute) {
    super(locator.endpoints.INVENTORY, locator, route);
  }


  // 🔹 Form Validation
  validateForm(form) {
    let flag = true;
    let validator = this.locator.dataValidator;

    flag = flag && validator.isNotNullObject(form.supplierName);
    flag = flag && validator.isNotNullObject(form.dob);
    flag = flag && validator.isNotNullObject(form.quantity);
    flag = flag && validator.isNotNullObject(form.product);

    return flag;
  }

  // 🔹 Populate Form (Edit case)
  populateForm(form, data) {
    form.id = data.id;
    form.supplierName = data.supplierName;
    form.dob = data.dob;
    form.quantity = data.quantity;
    form.product = data.product;
  }

  // 🔹 Supplier Name Validation
  validateName(event: KeyboardEvent): void {
    const inputValue = (event.target as HTMLInputElement).value;
    const inputChar = event.key;
    const alphabetPattern = /^[a-zA-Z ]*$/;

    if (!alphabetPattern.test(inputChar) && !['Backspace', 'Delete', 'Tab'].includes(inputChar)) {
      event.preventDefault();
      this.errorMessageName = 'Only alphabets are allowed.';
      return;
    }

    if (inputValue.length < 3) {
      this.errorMessageName = 'Supplier Name must be at least 3 characters.';
    } else if (inputValue.length > 20) {
      this.errorMessageName = 'Supplier Name must not exceed 20 characters.';
    } else {
      this.errorMessageName = '';
    }
  }

  // 🔹 Only Alphabet Input
  validateAlphabetInput(event) {
    const charCode = event.which || event.keyCode;
    const charStr = String.fromCharCode(charCode);

    if (!/^[a-zA-Z ]+$/.test(charStr)) {
      event.preventDefault();
    }
  }
}