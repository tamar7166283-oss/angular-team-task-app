import { Component, inject, input, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../services/comment-service';

@Component({
  selector: 'app-task-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-comments.html',
  styleUrl: './task-comments.css'
})
export class TaskComments implements OnInit {
  private commentService = inject(CommentService);

  taskId = input.required<number>();
  comments = this.commentService.comments;

  newCommentBody = signal<string>('');
  isLoading = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.commentService.loadComments(this.taskId()).subscribe({
      next: () => this.isLoading.set(false),
      error: () => {
        this.errorMessage.set('Error loading comments');
        this.isLoading.set(false);
      }
    });
  }

onSubmit() {
  if (!this.newCommentBody().trim() || this.isSubmitting()) return;

  this.isSubmitting.set(true);
  this.errorMessage.set(null);

  this.commentService.createComment({
    taskId: this.taskId(),
    body: this.newCommentBody()
  }).subscribe({
    next: () => {
      this.newCommentBody.set('');
      this.isSubmitting.set(false);
      // ה-Signal בסרוויס כבר יעדכן את הרשימה אוטומטית (201 Created)
    },
    error: (err) => {
      this.isSubmitting.set(false);
      this.errorMessage.set(err.status === 400 ? 'Invalid request' : 'Server error');
    }
  });
}
}