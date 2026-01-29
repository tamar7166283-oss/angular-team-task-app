import { inject, Injectable, signal } from '@angular/core';
import { CreateTaskPayload, Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    private http = inject(HttpClient);
  
  private _tasks = signal<Task[]>([]);
  readonly tasks = this._tasks.asReadonly();

  loadTasks(projectId?: number): Observable<Task[]> {
    const url = projectId 
      ? `${environment.apiUrl}/tasks?projectId=${projectId}` 
      : `${environment.apiUrl}/tasks`;

    return this.http.get<Task[]>(url).pipe(
      tap((data) => this._tasks.set(data))
    );
  }

  createTask(taskData: CreateTaskPayload): Observable<Task> {
    return this.http.post<Task>(`${environment.apiUrl}/tasks`, taskData).pipe(
      tap((newTask) => {
        this._tasks.update((list) => [...list, newTask]);
      })
    );
  }

  updateTask(id: number, changes: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${environment.apiUrl}/tasks/${id}`, changes).pipe(
      tap((updatedTask) => {
        this._tasks.update((list) =>
          list.map((t) => (t.id === id ? updatedTask : t))
        );
      })
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/tasks/${id}`).pipe(
      tap(() => {
        this._tasks.update((list) => list.filter((t) => t.id !== id));
      })
    );
  }
}

