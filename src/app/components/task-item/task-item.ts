import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css'
})
export class TaskItem {
  task = input.required<Task>();
  delete = output<number>(); 

  onDelete(event: Event) {
    event.stopPropagation();
    this.delete.emit(this.task().id);
  }
}