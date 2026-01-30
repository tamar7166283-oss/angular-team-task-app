import { Component, inject, input, output, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, CreateTaskPayload } from '../../models/task.model';
import { TaskService } from '../../services/task-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { TextFieldModule } from '@angular/cdk/text-field';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    TextFieldModule
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm implements OnInit {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);

  projectId = input.required<number>();
  taskToEdit = input<Task | null>(null);
  close = output<void>();

  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required],
    status: ['todo', Validators.required],
    priority: ['normal', Validators.required],
    assigneeId: [null as number | null],
    dueDate: [''],
    orderIndex: [0]
  });

  ngOnInit() {
    const task = this.taskToEdit();
    if (task) {
      this.taskForm.patchValue({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assigneeId: task.assignee_id,
        dueDate: task.due_date,
        orderIndex: task.order_index
      });
    }
  }

  onSubmit() {
    if (this.taskForm.invalid || this.isLoading()) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const values = this.taskForm.value;
    const payload: CreateTaskPayload = {
      projectId: this.projectId(),
      title: values.title!,
      description: values.description!,
      status: values.status as any,
      priority: values.priority as any,
      assigneeId: values.assigneeId || undefined,
      dueDate: values.dueDate || undefined,
      orderIndex: values.orderIndex || 0
    };

    const request$ = this.taskToEdit() 
      ? this.taskService.updateTask(this.taskToEdit()!.id, payload as CreateTaskPayload)
      : this.taskService.createTask(payload);

    request$.subscribe({
      next: () => {
        this.isLoading.set(false);
        this.close.emit();
      },
      error: (err) => {
        this.isLoading.set(false);
        if (err.status === 400) {
          this.errorMessage.set('Missing required fields. Please check title and project.');
        } else {
          this.errorMessage.set('Failed to save task. Please try again.');
        }
      }
    });
  }
}