# AngularAems

This is an experimental implementation of an API Entity Management Service for Angular.

## Install

Run `yarn add angular-aems` in your project root.

## Usage

### Step 1
Import `AngularAemsModule` in your App.

```js
import { AngularAemsModule } from 'angular-aems';

@NgModule({
  imports: [
    AngularAemsModule
  ]
})
export class AppModule {
}
```

### Step 2

Inject `EntityService` into your component, configure it and call methods.

```js
import { Component, OnInit } from '@angular/core';

import { EntityService } from 'angular-aems';

import { Event } from './_interfaces/event.interface';

@Component({
  selector: 'app-root',
  template: `<h2>Events</h2>
  <ul>
    <li *ngFor="let event of events">{{ event.title }}</li>
  </ul>`
})
export class AppComponent implements OnInit {
  events: Event[];

  constructor(
    private eventService: EntityService<Event>
  ) {
    eventService.config = {
      apiBaseUrl: 'events'
    };
  }

  ngOnInit() {
    this.eventService.getAll().subscribe(events => this.events = events);
  }
}

```
