import { Component, Input, OnChanges, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostsComponent implements OnDestroy, OnChanges {

  postsSubscription: Subscription;
  posts: Post[] = [];
  userPosts: Post[] = [];

  @Input() userId: number = -1;

  constructor(public postsService: PostsService) {
    this.postsSubscription =  this.postsService.posts.subscribe(p => this.posts = p);
  }

  ngOnChanges(): void {
    this.userPosts = this.posts.filter(item => item.userId === this.userId);
  }
  
  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }

}
