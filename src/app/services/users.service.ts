import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: BehaviorSubject<User[]> = new BehaviorSubject([new User()]);

  constructor(private http: HttpClient) { }

  loadUsers(): void {
    this.http.get<User[]>("https://jsonplaceholder.typicode.com/users")
      .subscribe(user => this.users.next(user));
  }

}
