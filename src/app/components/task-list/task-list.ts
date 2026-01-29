import { Component, computed, inject, input, signal, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskItem } from "../task-item/task-item";
import { TaskForm } from "../task-form/task-form";
import { TaskService } from '../../services/task-service';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItem, TaskForm, RouterOutlet],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  private taskService = inject(TaskService);

  projectId = input.required<string>(); 

  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  isModalOpen = signal<boolean>(false);
  taskToEdit = signal<Task | null>(null);

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
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe();
    }
  }
}