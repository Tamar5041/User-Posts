import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import * as _ from 'lodash-es';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent {

  @Output() selectUser: EventEmitter<number> = new EventEmitter();

  dataSource: any;
  columnNames: any[];
  displayedColumns: any[];

  constructor(private usersService: UsersService, private postsService: PostsService) {
    this.dataSource = usersService.getUsersDataSource();
    this.displayedColumns = usersService.getUsersDisplayedColumns();
    this.columnNames = this.displayedColumns.map(i => ({ id: i, value: _.upperFirst(i) }));
  
    this.postsService.loadPosts();
  }

  emitSelectUser(id: number): void {
    this.selectUser.emit(id);
  }

}
