# AngularAems

This is an experimental implementation of an API Entity Management Service for Angular.

## Install

Run `yarn add angular-aems` in your project root.

## Usage

### Step 1
Import `AngularAemsModule` in your app.

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

Inject `EntityService` into your component and set the `apiBaseUrl`.

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

## API

### Service types

There are three kinds of services to help getting the job done. 
- `Service`
- `Transformer`
- `Resource`

#### Service
The `Service` is the only "public" service you want to use directly in your code. Methods exists for read, write, update and delete one or more items.

If you extend the EntityService, the following methods are available:
```typescript
  /**
   * Set configuration for this instance
   * @param config Object of type EntityConfig.
   */
  setConfig(config: EntityConfig): void {
    this.config = config;
  }

  /**
   * Get on item.
   * @param id Id of the item you want to get.
   */
  getOne(id: number): Observable<T> {
    return this.resource.getOne(id, this.config.apiBaseUrl).pipe(
      map((entity: T) => this.transformer.backendToFrontend(entity))
    );
  }

  /**
   * Get all items
   */
  getAll(): Observable<T[]> {
    return this.resource.getAll(this.config.apiBaseUrl).pipe(
      map((entities: T[]) => entities.map(x => this.transformer.backendToFrontend(x)))
    );
  }
```

#### Transformer
The `Transformer` is the service, which is internally used to transform the data from the frontend interface (used in our application) with the backend interface (provided by the rest endpoint).

#### Resource
The `Resource` is the part of the concept, which talks to the backend.
