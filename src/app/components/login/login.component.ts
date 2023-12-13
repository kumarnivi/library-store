import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterServiceService } from 'src/app/shared/register-service.service';
import { UserInterface } from '../user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
loading: any;



constructor(
  private fb: FormBuilder,
  private http: HttpClient,
  public authService: RegisterServiceService,
  private router:Router
) {}

  //  this.formGroup
    login = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),

    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.http
      .post<{ user: UserInterface }>('https://api.realworld.io/api/users/login', {
        user: this.login.getRawValue(),
      })
      .subscribe((response) => {
        console.log(response, 'response');
        localStorage.setItem('token', response.user.token);
        localStorage.setItem('username', response.user.username);
        this.authService.setCurrentUser(response.user);
        this.router.navigate(['/'])
      });
  }
  
}

