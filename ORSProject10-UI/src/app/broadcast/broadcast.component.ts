import { Component } from '@angular/core';
import { BaseCtl } from '../base.component';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.css']
})
export class BroadcastComponent extends BaseCtl {

  constructor(
    public locator: ServiceLocatorService,
    public route: ActivatedRoute
  ) {
    super(locator.endpoints.BROADCAST, locator, route); 
  }

  // ✅ Validation
  validateForm(form) {
    let flag = true;
    let validator = this.serviceLocator.dataValidator;

    flag = flag && validator.isNotNullObject(form.broadcastCode);
    flag = flag && validator.isNotNullObject(form.message);
    flag = flag && validator.isNotNullObject(form.sentBy);
    flag = flag && validator.isNotNullObject(form.status);

    return flag;
  }

  // ✅ Populate Form (Edit case)
  populateForm(form, data) {

    form.id = data.id;
    form.broadcastCode = data.broadcastCode;
    form.message = data.message;
    form.sentBy = data.sentBy;
    form.status = data.status;

  }

}