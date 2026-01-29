import { Component, inject, input, output, signal } from '@angular/core';
import { TeamService } from '../../services/team-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddMember as AddMemberModel } from '../../models/team.model';

@Component({
  standalone:true,
  selector: 'app-add-member',
  imports: [ReactiveFormsModule],
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
    if(this.memberForm.invalid)
      return;
    const payload = this.memberForm.getRawValue();
    this.teamService.addMember(this.teamId(), payload as AddMemberModel).subscribe({
      next: () => {
        this.closeAddMember();
      },
      error: (err) => {
        if(err.status === 401)
          this.errorMessage.set('you dont have permission to add member to this team')
        this.errorMessage.set('Adding member failed. Please try again.');
      }
    });
  }

  closeAddMember(){
    this.close.emit();
  }

}
