import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Comment, CreateCommentPayload } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private http = inject(HttpClient);
  
  private _comments = signal<Comment[]>([]);
  readonly comments = this._comments.asReadonly();

  loadComments(taskId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.apiUrl}/comments`, {
      params: { taskId: taskId.toString() }
    }).pipe(
      tap(data => this._comments.set(data))
    );
  }

  createComment(payload: CreateCommentPayload): Observable<Comment> {
    return this.http.post<Comment>(`${environment.apiUrl}/comments`, payload).pipe(
      tap(newComment => {
        this._comments.update(list => [newComment, ...list]);
      })
    );
  }

  clearComments() {
    this._comments.set([]);
  }
}