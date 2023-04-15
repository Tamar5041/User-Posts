import { Component, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../models/user.model';
import * as _ from 'lodash-es';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnDestroy {

  dataSource: any;
  columnNames: any[];
  displayedColumns: any[];

  usersSubscription: Subscription;

  constructor(public usersService: UsersService) {
    this.usersSubscription = this.usersService.users
      .subscribe(u => {
        const users = (u as any[]).map(user => {
          const address = user.address;
          address.geo = `lat: ${address.geo.lat}, lng: ${address.geo.lng}`;

          const company = user.company;
          company.companyName = company.name;
          delete company.name;

          delete user.address;
          delete user.company;

          return { ...user, ...address, ...company };
        });

        this.dataSource = new MatTableDataSource(users);
      });

    const user = new User();
    this.displayedColumns = Object.keys(user);
    this.displayedColumns = this.displayedColumns.filter(c => !['address', 'company'].includes(c));

    const companyKeys = Object.keys(user.company).map(k => k === 'name' ? 'companyName' : k);
    this.displayedColumns = this.displayedColumns.concat(Object.keys(user.address)).concat(companyKeys);

    this.columnNames = this.displayedColumns.map(i => ({ id: i, value: _.upperFirst(i) }));
  }

  getPostsByUserId(id: string): void {
    console.log(id);
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }

}
