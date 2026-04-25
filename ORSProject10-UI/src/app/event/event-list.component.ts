import { Component } from '@angular/core';
import { BaseListCtl } from '../base-list.component';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent extends BaseListCtl {

  errorMessageEventCode: string;

  constructor(
    public locator: ServiceLocatorService,
    public route: ActivatedRoute,
    private httpClient: HttpClient
  ) {
    super(locator.endpoints.EVENT, locator, route);
  }

  // ✅ Event Code validation
  validateEventCode(event: KeyboardEvent): void {

    const inputValue = (event.target as HTMLInputElement).value;
    const inputChar = event.key;
    const pattern = /^[a-zA-Z0-9]*$/; // alphanumeric

    if (!pattern.test(inputChar) && !['Backspace', 'Delete', 'Tab'].includes(inputChar)) {
      event.preventDefault();
      this.errorMessageEventCode = 'Only alphabets and numbers allowed.';
      return;
    }

    if (inputValue.length < 3) {
      this.errorMessageEventCode = 'Event code must be at least 3 characters.';
    } else if (inputValue.length > 20) {
      this.errorMessageEventCode = 'Event code max 20 characters.';
    } else {
      this.errorMessageEventCode = '';
    }
  }

  // ✅ Event Name validation
  validateEventName(event: KeyboardEvent): void {

    const inputValue = (event.target as HTMLInputElement).value;

    if (inputValue.length < 3) {
      this.errorMessageEventCode = 'Event name must be at least 3 characters.';
    } else {
      this.errorMessageEventCode = '';
    }
  }

  // ✅ Common alphabet-only validation
  validateAlphabetInput(event: KeyboardEvent) {
    const charCode = event.which || event.keyCode;
    const charStr = String.fromCharCode(charCode);

    if (!/^[a-zA-Z]+$/.test(charStr)) {
      event.preventDefault();
    }
  }

}