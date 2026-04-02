import { Component, OnInit } from '@angular/core';
import { BaseCtl } from '../base.component';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent extends BaseCtl {

   constructor(public locator: ServiceLocatorService, public route: ActivatedRoute) {
    super(locator.endpoints.PRESCRIPTION, locator, route);
  }
 validateForm(form) {
    let flag = true;
    let validator = this.serviceLocator.dataValidator;

    flag = flag && validator.isNotNullObject(form.patientName);
    flag = flag && validator.isNotNullObject(form.doctorName);
    flag = flag && validator.isNotNullObject(form.mobileNumber);
    flag = flag && validator.isNotNullObject(form.prescribedDate);

    return flag;
  }

  // 🔹 Populate Form (Edit case)
  populateForm(form, data) {
    form.id = data.id;
    form.patientName = data.patientName;
    form.doctorName = data.doctorName;
    form.mobileNumber = data.mobileNumber;
    form.prescribedDate = data.prescribedDate;

    if (data.prescribedDate) {
    const d = new Date(data.prescribedDate);
    form.prescribedDate = d.toISOString().split('T')[0];
  }

  }

}
