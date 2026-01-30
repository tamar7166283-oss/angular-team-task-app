import { Component, inject, input, output, signal } from '@angular/core';
import { TeamService } from '../../services/team-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddMember as AddMemberModel } from '../../models/team.model';
import { CommonModule } from '@angular/common';

// --- Material Imports (חובה לעיצוב) ---
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select'; 

@Component({
  standalone: true,
  selector: 'app-add-member',
  imports: [
    ReactiveFormsModule, 
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule 
  ],
  templateUrl: './add-member.html',
  styleUrl: './add-member.css',
})
export class AddMember {
  teamId = input.required<number>();
  close = output<void>();
  
  private teamService = inject(TeamService);
  errorMessage = signal<string | null>(null);
  
  memberForm = new FormGroup({
    userId: new FormControl(null as unknown as number, [Validators.required]),
    role: new FormControl('member', [Validators.required])
  });

  onSubmit() {
    if(this.memberForm.invalid) return;

    const payload = this.memberForm.getRawValue();
    
    this.teamService.addMember(this.teamId(), payload as AddMemberModel).subscribe({
      next: () => {
        this.closeAddMember();
      },
      error: (err) => {
        if(err.status === 401) {
          this.errorMessage.set('Permission denied: You cannot add members.');
        } else {
          this.errorMessage.set('Failed to add member. Check the ID.');
        }
      }
    });
  }

  closeAddMember(){
    this.close.emit();
  }
}