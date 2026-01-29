import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateProjectPayload, Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private http = inject(HttpClient);
  
  private _projects = signal<Project[]>([]);
  readonly projects = this._projects.asReadonly();

  loadProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${environment.apiUrl}/projects`).pipe(
      tap((data) => this._projects.set(data))
    );
  }

  createProject(projectData:CreateProjectPayload): Observable<Project> {
    return this.http.post<Project>(`${environment.apiUrl}/projects`, projectData).pipe(
      tap((newProject) => {
        this._projects.update((list) => [...list, newProject]);
      })
    );
  }

}