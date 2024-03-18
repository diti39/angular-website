import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../category';


@Injectable({
  providedIn: 'root',
})
export class MyApiService {

  protected myApiServiceList: Category[] = [];

  private apiUrl = 'https://test.dev.al/test/';
  categories: any;

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

}
