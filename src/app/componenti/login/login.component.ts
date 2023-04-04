import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    //chiamare outservice
    console.log(email, password);
    this.auth
      .LoginUser({
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .subscribe((data) => {
        console.log(data);
      });
    form.reset();
  }
}
