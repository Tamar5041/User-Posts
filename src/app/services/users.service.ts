import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { reject } from 'lodash-es';
import { MatTableDataSource } from '@angular/material/table';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: BehaviorSubject<User[]> = new BehaviorSubject([new User()]);

  constructor(private http: HttpClient) { }

  loadUsers(): Promise<any> {
    return new Promise((resolve) => {
      this.http.get<User[]>("https://jsonplaceholder.typicode.com/users")
        .subscribe(user => {
          this.users.next(user);
          resolve(true);
        });
      reject;
    });
  }

  getUsersDataSource(): MatTableDataSource<any> {
    return new MatTableDataSource((this.users.getValue() as any[]).map(user => {
      const address = user.address;
      address.geo = `lat: ${address.geo.lat}, lng: ${address.geo.lng}`;

      const company = user.company;
      company.companyName = company.name;
      delete company.name;

      delete user.address;
      delete user.company;

      return { ...user, ...address, ...company };
    }));
  }

  getUsersDisplayedColumns(): any[] {
    let displayedColumns: any[] = [];
    const user = new User();
    displayedColumns = Object.keys(user);
    displayedColumns = displayedColumns.filter(c => !['address', 'company'].includes(c));

    const companyKeys = Object.keys(user.company).map(k => k === 'name' ? 'companyName' : k);
    displayedColumns = displayedColumns.concat(Object.keys(user.address)).concat(companyKeys);
    return displayedColumns;
  }

}
