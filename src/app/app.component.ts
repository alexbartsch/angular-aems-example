import { Component, OnInit } from '@angular/core';

import { EntityService } from 'angular-aems';

import { CustomerService } from './_services/customer.service';
import { Customer } from './_interfaces/customer.interface';
import { Event } from './_interfaces/event.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'API Entity Management Service';

  events: Event[];
  customers: Customer[];

  constructor(
    private eventService: EntityService<Event>,
    private customerService: CustomerService
  ) {
    eventService.config = {
      apiBaseUrl: 'events'
    };
  }

  ngOnInit() {
    this.eventService.getAll().subscribe(events => this.events = events);
    this.customerService.getAll().subscribe(customers => this.customers = customers);
  }
}
