import { Component, OnInit } from '@angular/core';
import { BaseListCtl } from '../base-list.component';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent extends BaseListCtl{

  errorMessageClientName: string;
  
  
    constructor(public locator: ServiceLocatorService, public route: ActivatedRoute, private httpClient: HttpClient) {
      super(locator.endpoints.PRESCRIPTION, locator, route);
    }
  
  
    validateFullName(event: KeyboardEvent): void {
      const inputValue = (event.target as HTMLInputElement).value;
      const inputChar = event.key;
      const alphabetPattern = /^[a-zA-Z]*$/;  // Pattern to match only alphabetic characters
  
      if (!alphabetPattern.test(inputChar) && !['Backspace', 'Delete', 'Tab'].includes(inputChar)) {
        event.preventDefault();
        this.errorMessageClientName = 'Only alphabets are allowed.';
        return;
      }
  
      if (inputValue.length < 3) {
        this.errorMessageClientName = 'name must be at least 3 characters .';
      } else if (inputValue.length > 15) {
        this.errorMessageClientName = 'name must contain only 15 character.';
      } else {
        this.errorMessageClientName = '';  // Clear error message if valid
      }
    }
  
    validateAlphabetInput(event) {
      const charCode = event.which || event.keyCode;
      const charStr = String.fromCharCode(charCode);
  
      // Regular expression to test if the character is a letter
      if (!/^[a-zA-Z]+$/.test(charStr)) {
        event.preventDefault();
      }
    }

}
