import { Component, OnInit } from '@angular/core';
import { BaseCtl } from '../base.component';
import { ServiceLocatorService } from '../service-locator.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transportation',
  templateUrl: './transportation.component.html'
})
export class TransportationComponent extends BaseCtl{

 constructor(public locator: ServiceLocatorService, public route: ActivatedRoute) {
     super(locator.endpoints.TRANSPORTATION, locator, route);
 
   }

}
