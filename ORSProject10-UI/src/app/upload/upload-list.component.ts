import { Component } from '@angular/core';
import { BaseListCtl } from '../base-list.component';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})
export class UploadListComponent extends BaseListCtl {

  errorMessageUploadCode: string;

  constructor(
    public locator: ServiceLocatorService,
    public route: ActivatedRoute,
    private httpClient: HttpClient
  ) {
    super(locator.endpoints.UPLOAD, locator, route);
  }

  // ✅ Upload Code validation (like accountHolder)
  validateUploadCode(event: KeyboardEvent): void {

    const inputValue = (event.target as HTMLInputElement).value;
    const inputChar = event.key;
    const pattern = /^[a-zA-Z0-9]*$/; // alphanumeric

    if (!pattern.test(inputChar) && !['Backspace', 'Delete', 'Tab'].includes(inputChar)) {
      event.preventDefault();
      this.errorMessageUploadCode = 'Only alphabets and numbers allowed.';
      return;
    }

    if (inputValue.length < 3) {
      this.errorMessageUploadCode = 'Upload code must be at least 3 characters.';
    } else if (inputValue.length > 20) {
      this.errorMessageUploadCode = 'Upload code max 20 characters.';
    } else {
      this.errorMessageUploadCode = '';
    }
  }

  // ✅ File Name validation
  validateFileName(event: KeyboardEvent): void {

    const inputValue = (event.target as HTMLInputElement).value;

    if (inputValue.length < 3) {
      this.errorMessageUploadCode = 'File name must be at least 3 characters.';
    } else {
      this.errorMessageUploadCode = '';
    }
  }

  // ✅ Common alphabet-only validation (optional use)
  validateAlphabetInput(event: KeyboardEvent) {
    const charCode = event.which || event.keyCode;
    const charStr = String.fromCharCode(charCode);

    if (!/^[a-zA-Z]+$/.test(charStr)) {
      event.preventDefault();
    }
  }

}