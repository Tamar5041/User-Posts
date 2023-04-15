import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts: BehaviorSubject<Post[]> = new BehaviorSubject([new Post()]);

  constructor(private http: HttpClient) { }

  loadPosts(): void {
    this.http.get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .subscribe(post => this.posts.next(post));
  }

}
