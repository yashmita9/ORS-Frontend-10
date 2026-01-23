import { OnInit, Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ServiceLocatorService } from './service-locator.service';
import { HttpServiceService } from './http-service.service';
import { ActivatedRoute } from '@angular/router';
import { BaseCtl } from './base.component';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { element } from '@angular/core/src/render3';

export class BaseListCtl extends BaseCtl {

  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  deleteRecordList: any = [];
  isMasterSel: boolean = false;
  checkList = 0;

  constructor(public endpoint, public locator: ServiceLocatorService, public route: ActivatedRoute) {
    super(endpoint, locator, route);
  }

  /**
   * Initialize component
   */
  ngOnInit() {
    this.preload();
    this.search();
    this.isMasterSel = false;
  }

  submit() {
    this.form.pageNo = 0;
    if (this.form.searchParams.roleId == "undefined" || this.form.searchParams.id == "undefined") {

      this.form.searchParams = {}
      this.search();
    } else {
      this.search();
    }
  }

  delete(id) {
    super.delete(id, function () {
      this.search();
    });
  }


    next() {
        this.isMasterSel = false;
        this.form.pageNo++;
        this.search();
    }

  exit() {

    location.reload();
  }
   previous() {
        this.isMasterSel = false;
        this.form.pageNo--
        this.search();
    }



  checkUncheckAll(event) {
    const checked = event.target.checked;
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = checked
    });
  }
  checklistUpdate() {

    this.isMasterSel = false;
    this.checkList = 0;
    this.checkboxes.forEach((element) => {
      if (element.nativeElement.checked == true) {
        this.checkList = this.checkList + 1;
      }
    });
    if (this.checkList == this.form.list.length) {
      this.isMasterSel = true;

    }
  }

  deleteMany() {
    
    this.form.error = false;
    this.deleteRecordList.length = 0;

    this.checkboxes.forEach((element) => {
      if (element.nativeElement.checked) {
        this.deleteRecordList.push(element.nativeElement.id);
      }
    });

    if (this.deleteRecordList.length > 0) {
            this.form.pageNo = 0;
            super.deleteMany(this.deleteRecordList + '?pageNo=' + this.form.pageNo);
        } else {
            this.form.error = true;
            this.form.message = "Select at least one record";
        }
    this.isMasterSel = false;
  }


  generateReport() {

  }

}

