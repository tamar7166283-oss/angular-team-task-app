import { Component, computed, inject, input, signal, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskItem } from "../task-item/task-item";
import { TaskForm } from "../task-form/task-form";
import { TaskService } from '../../services/task-service';
import { Router, RouterOutlet } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItem, TaskForm, RouterOutlet, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatDividerModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  private taskService = inject(TaskService);
  private router = inject(Router);

  projectId = input.required<string>(); 

  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  isModalOpen = signal<boolean>(false);
  taskToEdit = signal<Task | null>(null);
  isTaskSelected = signal(false);

  numericProjectId = computed(() => Number(this.projectId()));

  tasks = computed(() => {
    return this.taskService.tasks().filter(t => t.project_id === this.numericProjectId());
  });

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    
    this.taskService.loadTasks(this.numericProjectId()).subscribe({
      next: () => this.isLoading.set(false),
      error: () => {
        this.errorMessage.set('Failed to load tasks. Please try again.');
        this.isLoading.set(false);
      }
    });
  }

  openAddModal() {
    this.taskToEdit.set(null);
    this.isModalOpen.set(true);
  }

  openEditModal(task: Task) {
    this.taskToEdit.set(task); 
    this.isModalOpen.set(true);
  }

  handleDelete(taskId: number) {
    const isConfirmed = confirm('Are you sure you want to delete this task?');
    
    if (isConfirmed) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          if (this.router.url.includes(`/tasks/${taskId}`)) {
            this.router.navigate(['projects', this.projectId(), 'tasks']);
            this.isTaskSelected.set(false);
          }
        },
        error: (err) => console.error('Delete failed', err)
      });
    }
  }

  onChildActivated(componentRef: any) {
    this.isTaskSelected.set(true);

    if (componentRef.edit) {
      componentRef.edit.subscribe((task: Task) => {
        this.openEditModal(task);
      });
    }
  }

  onChildDeactivated() {
    this.isTaskSelected.set(false);
  }
}