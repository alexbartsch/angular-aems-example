import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { EntityResource } from '../_resources/entity.resource';
import { EntityTransformer } from '../_transformers/entity.transformer';
import { EntityConfig } from '../_interfaces/entity-config.interface';

@Injectable({
  providedIn: 'root'
})
export class EntityService<T> {

  config: EntityConfig;

  entitySubject: ReplaySubject<T> = new ReplaySubject<T>(1);

  constructor(
    private resource: EntityResource<T>,
    private transformer: EntityTransformer<T>
  ) {
  }

  setConfig(config: EntityConfig): void {
    this.config = config;
  }

  getOne(id: number): Observable<T> {
    return this.resource.getOne(id, this.config.apiBaseUrl).pipe(
      map((entity: T) => this.transformer.backendToFrontend(entity))
    );
  }

  getAll(): Observable<T[]> {
    return this.resource.getAll(this.config.apiBaseUrl).pipe(
      map((entities: T[]) => entities.map(x => this.transformer.backendToFrontend(x)))
    );
  }

}
