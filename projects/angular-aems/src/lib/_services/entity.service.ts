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

}
