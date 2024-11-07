import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Directive } from '@angular/core';

import { environment } from '../../environments/environment';

@Directive()
export abstract class BaseService<T> {
  protected baseUrl: string;

  constructor(public http: HttpClient, private entity: string = '') {
    this.baseUrl = environment.apiUrl;
  }

  protected commonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  public post(object?: T, param: string = ''): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${this.entity}${param}`,
      object, { headers: this.commonHeaders() });
  }

  public patch(object: T | any, param: string = ''): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${this.entity}${param}`, object,
      { headers: this.commonHeaders() }
    );
  }

  public put(object: T | any, param: string = ''): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${this.entity}${param}`, object,
      { headers: this.commonHeaders() }
    );
  }

  public get(param: string = '', headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${this.entity}${param}`, {
      headers: headers
        ? headers
        : this.commonHeaders()
    });
  }
}
