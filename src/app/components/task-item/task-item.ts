import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [RouterLink, CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
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

  getStatusColor(status: string): string {
  const colors: { [key: string]: string } = {
    'todo': '#94a3b8',
    'in-progress': '#7b68ee',
    'done': '#22c55e',
    'review': '#f59e0b'
  };
  return colors[status.toLowerCase()] || '#cbd5e1';
}
}