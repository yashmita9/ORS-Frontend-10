import { Component } from '@angular/core';
import { BaseListCtl } from '../base-list.component';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-broadcast-list',
  templateUrl: './broadcast-list.component.html',
  styleUrls: ['./broadcast-list.component.css']
})
export class BroadcastListComponent extends BaseListCtl {

  errorMessageBroadcastCode: string;

  constructor(
    public locator: ServiceLocatorService,
    public route: ActivatedRoute,
    private httpClient: HttpClient
  ) {
    super(locator.endpoints.BROADCAST, locator, route);
  }

  // ✅ Broadcast Code validation (alphanumeric)
  validateBroadcastCode(event: KeyboardEvent): void {

    const inputValue = (event.target as HTMLInputElement).value;
    const inputChar = event.key;
    const pattern = /^[a-zA-Z0-9]*$/;

    if (!pattern.test(inputChar) &&
      !['Backspace', 'Delete', 'Tab'].includes(inputChar)) {
      event.preventDefault();
      this.errorMessageBroadcastCode = 'Only alphabets and numbers allowed.';
      return;
    }

    if (inputValue.length < 3) {
      this.errorMessageBroadcastCode = 'Broadcast code must be at least 3 characters.';
    } else if (inputValue.length > 20) {
      this.errorMessageBroadcastCode = 'Broadcast code max 20 characters.';
    } else {
      this.errorMessageBroadcastCode = '';
    }
  }

  // ✅ Message validation
  validateMessage(event: KeyboardEvent): void {

    const inputValue = (event.target as HTMLInputElement).value;

    if (inputValue.length < 3) {
      this.errorMessageBroadcastCode = 'Message must be at least 3 characters.';
    } else {
      this.errorMessageBroadcastCode = '';
    }
  }

  // ✅ SentBy validation (alphabet only)
  validateAlphabetInput(event: KeyboardEvent) {
    const charCode = event.which || event.keyCode;
    const charStr = String.fromCharCode(charCode);

    if (!/^[a-zA-Z ]+$/.test(charStr)) {
      event.preventDefault();
    }
  }

}