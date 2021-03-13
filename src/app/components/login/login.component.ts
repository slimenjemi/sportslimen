import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:any={};
  loginForm:FormGroup;
  constructor(private  FormBuilder:FormBuilder,
    private userService:UserService,
    private router:Router) { }

  ngOnInit() {
    this.loginForm=this.FormBuilder.group(
      {
        email:[''],
        pwd:['']
       
      }
    )
  }
  login(){
    this.userService.login(this.user).subscribe(
      (data)=> {
        console.log('User is logged in', data.message);
        if (data.message=='2'){
          this.router.navigate(['admin']);
        }

      }
    )
   
     }


}
