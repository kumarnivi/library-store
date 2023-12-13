import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserInterface } from '../user.interface';
import { RegisterServiceService } from 'src/app/shared/register-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loading: any;
  submitted: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public authService: RegisterServiceService,
    private router:Router
  ) {}

  ngOnInit(): void {}

  //  this.formGroup
  myForm = this.fb.group({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),

    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.http
      .post<{ user: UserInterface }>('https://api.realworld.io/api/users', {
        user: this.myForm.getRawValue(),
      })
      .subscribe((response) => {
        console.log(response, 'response');
        localStorage.setItem('token', response.user.token);
        this.authService.setCurrentUser(response.user);
        this.router.navigate(['/'])
      });
  }
}
