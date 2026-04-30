import { Component, OnInit } from '@angular/core';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';
import { BaseCtl } from '../base.component';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent extends BaseCtl implements OnInit {

  errorMessageBatchCode: string = '';

  constructor(
    public locator: ServiceLocatorService,
    public route: ActivatedRoute
  ) {
    super(locator.endpoints.BATCH, locator, route);
  }

  ngOnInit(): void {}

  // ✅ Form Validation
  validateForm(form) {
    let flag = true;
    let validator = this.locator.dataValidator;

    flag = flag && validator.isNotNullObject(form.batchCode);
    flag = flag && validator.isNotNullObject(form.totalMessages);
    flag = flag && validator.isNotNullObject(form.processedCount);
    flag = flag && validator.isNotNullObject(form.status);

    // ✅ extra business validation
    if (form.processedCount > form.totalMessages) {
      this.form.message = "Processed count cannot be greater than total messages";
      this.form.error = true;
      flag = false;
    }

    return flag;
  }

  // ✅ Populate Form (Edit case)
  populateForm(form, data) {
    form.id = data.id;
    form.batchCode = data.batchCode;
    form.totalMessages = data.totalMessages;
    form.processedCount = data.processedCount;
    form.status = data.status;
  }

  // ✅ Batch Code Validation (alphanumeric)
  validateBatchCode(event: KeyboardEvent): void {
    const inputValue = (event.target as HTMLInputElement).value;
    const inputChar = event.key;

    const pattern = /^[a-zA-Z0-9]*$/;

    if (!pattern.test(inputChar) && !['Backspace', 'Delete', 'Tab'].includes(inputChar)) {
      event.preventDefault();
      this.errorMessageBatchCode = 'Only alphanumeric allowed';
      return;
    }

    if (inputValue.length < 3) {
      this.errorMessageBatchCode = 'Minimum 3 characters required';
    } else if (inputValue.length > 20) {
      this.errorMessageBatchCode = 'Max 20 characters allowed';
    } else {
      this.errorMessageBatchCode = '';
    }
  }

  // ✅ Only number input
  validateNumberInput(event: KeyboardEvent): void {
    const charCode = event.which || event.keyCode;
    const charStr = String.fromCharCode(charCode);

    if (!/^[0-9]+$/.test(charStr)) {
      event.preventDefault();
    }
  }

}