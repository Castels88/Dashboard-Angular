import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServizioService {
  constructor(private http: HttpClient) {}

  registerUser(url: string, body: {}) {
    return this.http.post(url, body);
  }
  LoginUser(url: string, body: {}) {
    return this.http.post(url, body);
  }
}
