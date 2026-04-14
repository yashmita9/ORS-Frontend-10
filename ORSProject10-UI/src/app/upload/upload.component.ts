import { Component } from '@angular/core';
import { BaseCtl } from '../base.component';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent extends BaseCtl {

  constructor(
    public locator: ServiceLocatorService,
    public route: ActivatedRoute
  ) {
    super(locator.endpoints.UPLOAD, locator, route);
  }

  // ✅ Validation
  validateForm(form) {
    let flag = true;
    let validator = this.serviceLocator.dataValidator;

    flag = flag && validator.isNotNullObject(form.uploadCode);
    flag = flag && validator.isNotNullObject(form.fileName);
    flag = flag && validator.isNotNullObject(form.uploadedBy);
    flag = flag && validator.isNotNullObject(form.status);

    return flag;
  }

  // ✅ Populate Form (Edit case)
  populateForm(form, data) {

    form.id = data.id;
    form.uploadCode = data.uploadCode;
    form.fileName = data.fileName;
    form.uploadedBy = data.uploadedBy;
    form.status = data.status;

  }

}