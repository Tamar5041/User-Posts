import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  users: User[] = [];

  userName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private usersService: UsersService, private route: Router) {
    this.usersService.users
      .subscribe(u => this.users = u);
  }

  login(): void {
    if (this.users.find(uu => uu.username == this.userName.value && uu.email == this.email.value)) {
      this.route.navigate(['/users']);
    } else {
alert("false")
    }

  }


}
