import { Component, inject, input, signal,computed } from '@angular/core';
import { ProjectService } from '../../services/project-service';
import { CommonModule } from '@angular/common';
import { AddProject } from "../add-project/add-project";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, AddProject,RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  private projectService = inject(ProjectService);
  teamId = input.required<string|undefined>(); 
  errorMessage = signal<string | null>(null);
  isLoading = signal<boolean>(false);
  isModalOpen = signal<boolean>(false);
  title = computed(() => 
  this.teamId() ? `Team Projects #${this.teamId()}` : 'All My Projects'
); 

filteredProjects = computed(() => {
    const projects = this.projectService.projects();
    const id = this.teamId(); 
    return id ? projects.filter(p => p.team_id === Number(id)) : projects;
  });

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading.set(true);
    this.projectService.loadProjects().subscribe({
      next: () => this.isLoading.set(false),
      error: (err) => {
        this.errorMessage.set('error loading projects. Please try again');
        this.isLoading.set(false);
      }
    });
  }
}


