import { Component, OnInit } from '@angular/core';
import { BaseCtl } from '../base.component';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent extends BaseCtl {

  
    getKey = false;
    selected = null;
    constructor(public locator: ServiceLocatorService, public route: ActivatedRoute, private httpClient: HttpClient) {
      super(locator.endpoints.CUSTOMER, locator, route);
    }
  
    submit() {
      var _self = this;
      console.log('in submit');
      console.log(this.form);
      console.log(this.form.data);
      this.serviceLocator.httpService.post(this.api.save, this.form.data, function (res) {
        _self.form.message = '';
        _self.form.data.id = res.result.data;
      
        if (res.success) {
          _self.form.message = "Data is saved";
          _self.form.data.id = res.result.data;
  
          console.log(_self.form.data.id);
          console.log("----------Rahul----------.");
  
        } else {
          _self.form.error = true;
          if (res.result.inputerror) {
            _self.form.inputerror = res.result.inputerror;
          }
          _self.form.message = res.result.message;
        }
        _self.form.data.id = res.result.data;
        console.log('FORM', _self.form);
      });
    }

     validateForm(form) {
    let flag = true;
    let validator = this.serviceLocator.dataValidator;
    
    flag = flag && validator.isNotNullObject(form.clientName);
    console.log(form.clientName);
    flag = flag && validator.isNotNullObject(form.location);
    console.log(form.location);
    flag = flag && validator.isNotNullObject(form.contactNumber);
    console.log(form.contactNumber);
    flag = flag && validator.isNotNullObject(form.importance);
    console.log(form.importance);
   
    return flag;
  }
  
    populateForm(form, data) {
      form.id = data.id;
      console.log(form.id + 'populate form in customercomponent');
      form.clientName = data.clientName;
      form.location = data.location;
      form.contactNumber = data.contactNumber;
      form.importance = data.importance;
    }
    
    parseDate(dateString: string): Date {
      if (dateString) {
        return new Date(dateString);
      }
      return null;
    }
    test() {
  
    }
}
