import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnDestroy {

  subscriptions: Subscription[];
  posts: Post[] = [];
  userPosts: Post[] = [];

  constructor(public postsService: PostsService,
              private userService: UsersService) {
    const postsSubscription = this.postsService.posts
      .subscribe(p => this.posts = p);

    const selectedIdSubscription = this.userService.selectedUserId
      .subscribe(id => {
        console.log(id);
        
        this.userPosts = this.posts.filter(item => item.userId === id)
      });

    this.subscriptions = [postsSubscription, selectedIdSubscription];
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
