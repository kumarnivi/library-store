import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RegisterServiceService } from 'src/app/shared/register-service.service';
import { UserInterface } from '../user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{


  constructor(public authService:RegisterServiceService, public http:HttpClient){}


  ngOnInit(): void {
    this.http.get<{user:UserInterface}>('https://api.realworld.io/api/user', )
    .subscribe({
      next:(response) =>{
        console.log(response)
        this.authService.setCurrentUser(response.user)
      }
    })
  }


}
