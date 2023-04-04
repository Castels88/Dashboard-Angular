import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = true;
  signUpUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDZLPM-SAjl0omQYXNE4RFGOtFFkh334d4';

  signInurl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDZLPM-SAjl0omQYXNE4RFGOtFFkh334d4';

  constructor(private http: HttpClient) {}

  registerUser(body: {}) {
    return this.http.post(this.signUpUrl, body);
  }
  LoginUser(body: {}) {
    return this.http.post(this.signInurl, body);
  }
}
