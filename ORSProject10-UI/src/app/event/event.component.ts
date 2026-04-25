import { Component } from '@angular/core';
import { BaseCtl } from '../base.component';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent extends BaseCtl {

  constructor(
    public locator: ServiceLocatorService,
    public route: ActivatedRoute
  ) {
    super(locator.endpoints.EVENT, locator, route);
  }

  // ✅ Validation
  validateForm(form) {
    let flag = true;
    let validator = this.serviceLocator.dataValidator;

    flag = flag && validator.isNotNullObject(form.eventCode);
    flag = flag && validator.isNotNullObject(form.eventName);
    flag = flag && validator.isNotNullObject(form.eventDate);
    flag = flag && validator.isNotNullObject(form.status);

    return flag;
  }

  // ✅ Populate Form (Edit case)
  populateForm(form, data) {

    form.id = data.id;
    form.eventCode = data.eventCode;
    form.eventName = data.eventName;
    form.eventDate = data.eventDate;
    form.status = data.status;

  }

}