import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  customers: any[] = [
    { id: 1, firstname: 'Alex', lastname: 'Balhali' },
    { id: 2, firstname: 'Thomas', lastname: 'Shent' },
    { id: 3, firstname: 'Barbara', lastname: 'Kokoku' },
    { id: 4, firstname: 'Svetlana', lastname: 'Beretho' },
  ];

  events: any[] = [
    { id: 1, title: 'HolyHo 2019' },
    { id: 2, title: 'Nice Winter Jam' },
    { id: 3, title: 'Good Vibes' },
    { id: 4, title: 'Baby come back Tour' },
  ];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // wrap in delayed observable to simulate server api call
    return of(null).pipe(mergeMap(() => {

      // get customers
      if (request.url.endsWith('customers') && request.method === 'GET') {
        return of(new HttpResponse({ status: 200, body: this.customers }));
      }

      // get customer by id
      if (request.url.match(/customers\/\d+$/) && request.method === 'GET') {
        // find customer by id in customers array
        const urlParts = request.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 1], 0);
        const matchedCustomers = this.customers.filter(c => {
          return c.id === id;
        });
        const customer = matchedCustomers.length ? matchedCustomers[0] : null;

        return of(new HttpResponse({ status: 200, body: customer }));
      }

      // get events
      if (request.url.endsWith('events') && request.method === 'GET') {
        return of(new HttpResponse({ status: 200, body: this.events }));
      }

      // get event by id
      if (request.url.match(/events\/\d+$/) && request.method === 'GET') {
        // find customer by id in events array
        const urlParts = request.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 1], 0);
        const matchedEvents = this.events.filter(c => {
          return c.id === id;
        });
        const event = matchedEvents.length ? matchedEvents[0] : null;

        return of(new HttpResponse({ status: 200, body: event }));
      }

      // pass through any requests not handled above
      return next.handle(request);
    }))

      // call materialize and dematerialize to ensure delay even if an error is thrown
      // (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
