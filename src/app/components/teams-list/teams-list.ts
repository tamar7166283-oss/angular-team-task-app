import { Component, inject, OnInit, signal } from '@angular/core';
import { TeamService } from '../../services/team-service';
import { RouterLink } from "@angular/router";
import { AddTeam } from '../add-team/add-team';
import { AddMember } from "../add-member/add-member";

@Component({
  selector: 'app-teams-list',
  imports: [RouterLink, AddTeam, AddMember],
  templateUrl: './teams-list.html',
  styleUrl: './teams-list.css',
})
export class TeamsList implements OnInit{
 protected teamsService = inject(TeamService);
  isLoading = signal(false);
  showAddTeam = signal<boolean>(false);
  errorMessage = signal<string|null>(null);
  selectedTeamId = signal<number | null>(null);

  ngOnInit() {
    this.isLoading.set(true);
    this.teamsService.loadTeams().subscribe({
      next: () => {this.isLoading.set(false)
        this.errorMessage.set(null)
      },
      error: () => {this.isLoading.set(false)
          this.errorMessage.set('error loading teams. Please try again');}
    });
  }

closeAddTeam() {
  this.showAddTeam.set(false); 
}

openAddTeam()
{
  this.showAddTeam.set(true);
}
}
