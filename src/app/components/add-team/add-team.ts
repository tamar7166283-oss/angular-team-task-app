import { Component, inject, output, signal } from '@angular/core';
import { TeamService } from '../../services/team-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-add-team',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './add-team.html',
  styleUrl: './add-team.css',
})
export class AddTeam {
private teamService = inject(TeamService);

  close = output<void>();
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  teamForm = new FormGroup({
    name: new FormControl('', [
      Validators.required, 
      Validators.minLength(2),
      Validators.maxLength(30)
    ])
  });

  onSubmit() {
    if (this.teamForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);
    const teamName = this.teamForm.value.name as string;
    this.teamService.createTeam(teamName).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.teamForm.reset();
        this.close.emit();
      },
      error: (err) => {
        if(err.status === 400)
          this.errorMessage.set('team name is required');
        this.isLoading.set(false);
        this.errorMessage.set('adding team failed');
      }
    });
  }

  onClose(){
    this.close.emit();
  }
}

