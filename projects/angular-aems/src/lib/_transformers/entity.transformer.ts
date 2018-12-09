import { Injectable } from '@angular/core';

@Injectable()
export class EntityTransformer<T> {
  backendToFrontend(entity: T): T {
    return entity;
  }

  frontendToBackend(entity: T): T {
    return entity;
  }
}
