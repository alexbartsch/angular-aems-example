import { Injectable } from '@angular/core';

import { EntityService } from 'angular-aems';

import { Customer } from '../_interfaces/customer.interface';

@Injectable()
export class CustomerService extends EntityService<Customer> {

  config = {
    apiBaseUrl: 'customers'
  };

}
