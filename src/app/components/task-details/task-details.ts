import { Component, computed, inject, input, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task-service';
import { TaskComments } from '../task-comments/task-comments';
import { TaskForm } from '../task-form/task-form';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, TaskComments, TaskForm, RouterLink],
  templateUrl: './task-details.html',
  styleUrl: './task-details.css',
})
export class TaskDetails implements OnInit {
  private taskService = inject(TaskService);

  taskId = input.required<string>(); 
  projectId = input.required<string>();
  
  isLoading = signal(false);  
  errorMessage = signal<string | null>(null);
  isEditModalOpen = signal(false);

  task = computed(() => {
    const id = Number(this.taskId());
    return this.taskService.tasks().find(t => t.id === id) || null;
  });

  ngOnInit() {
    if (!this.task()) {
      this.loadRequiredData();
    }
     console.log('Project ID received:', this.projectId());
  console.log('Task ID received:', this.taskId());
  }

  loadRequiredData() {
    this.isLoading.set(true);
    this.taskService.loadTasks(Number(this.projectId())).subscribe({
      next: () => this.isLoading.set(false),
      error: () => {
        this.errorMessage.set('Error loading task details');
        this.isLoading.set(false);
      }
    });
  }

  // פונקציית עזר למרה בטוחה של מספרים ב-HTML
  asNumber(val: string) {
    return Number(val);
  }
}
