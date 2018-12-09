import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class EntityResource<T> {
  constructor(private httpClient: HttpClient) {
  }

  getOne(id: number, apiBaseUrl: string): Observable<T> {
    return this.httpClient.get<T>(apiBaseUrl + '/' + id + '/');
  }

  getAll(apiBaseUrl: string): Observable<T[]> {
    return this.httpClient.get<T[]>(apiBaseUrl);
  }
}
