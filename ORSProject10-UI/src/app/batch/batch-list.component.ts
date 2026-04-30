import { Component, OnInit } from '@angular/core';
import { BaseListCtl } from '../base-list.component';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.css']
})
export class BatchListComponent extends BaseListCtl implements OnInit {

  errorMessageBatchCode: string = '';

  constructor(
    public locator: ServiceLocatorService,
    public route: ActivatedRoute,
    private httpClient: HttpClient
  ) {
    super(locator.endpoints.BATCH, locator, route);
  }

  // ✅ Batch Code Validation (alphanumeric)
  validateBatchCode(event: KeyboardEvent): void {
    const inputValue = (event.target as HTMLInputElement).value;
    const inputChar = event.key;

    const pattern = /^[a-zA-Z0-9]*$/;

    if (!pattern.test(inputChar) && !['Backspace', 'Delete', 'Tab'].includes(inputChar)) {
      event.preventDefault();
      this.errorMessageBatchCode = 'Only alphanumeric values allowed';
      return;
    }

    if (inputValue.length < 3) {
      this.errorMessageBatchCode = 'Batch code must be at least 3 characters';
    } else if (inputValue.length > 20) {
      this.errorMessageBatchCode = 'Max 20 characters allowed';
    } else {
      this.errorMessageBatchCode = '';
    }
  }

  // ✅ Only number validation (for totalMessages, processedCount)
  validateNumberInput(event: KeyboardEvent): void {
    const charCode = event.which || event.keyCode;
    const charStr = String.fromCharCode(charCode);

    if (!/^[0-9]+$/.test(charStr)) {
      event.preventDefault();
    }
  }

}