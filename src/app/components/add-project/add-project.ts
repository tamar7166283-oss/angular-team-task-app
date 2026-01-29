import { Component, inject, input, output, signal } from '@angular/core';
import { ProjectService } from '../../services/project-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateProjectPayload } from '../../models/project.model';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-project.html',
  styleUrl: './add-project.css',
})
export class AddProject {
  private projectService = inject(ProjectService);
  teamId = input.required<string>(); 

  close = output<void>();
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  projectForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(200)
    ])
  });

  submit() {
    if (this.projectForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const payload: CreateProjectPayload = {
      name: this.projectForm.value.name as string,
      description: this.projectForm.value.description as string,
      teamId: Number(this.teamId())
    };

    this.projectService.createProject(payload).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.projectForm.reset();
        this.close.emit();
      },
      error: (err) => {
        this.isLoading.set(false);
        if (err.status === 403) {
          this.errorMessage.set('You do not have permission to add projects to this team');
        } else {
          if(err.status === 400)
            this.errorMessage.set('team name is required');
          this.errorMessage.set('Adding project failed. Please try again');
        }
      }
    });
  }

  onClose() {
    this.close.emit();
  }
}