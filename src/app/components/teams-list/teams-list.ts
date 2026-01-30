import { Component, inject, OnInit, signal } from '@angular/core';
import { TeamService } from '../../services/team-service';
import { RouterLink } from "@angular/router";
import { AddTeam } from '../add-team/add-team';
import { AddMember } from "../add-member/add-member";
import { CommonModule } from '@angular/common';

// --- Material Imports ---
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-teams-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink, 
    AddTeam, 
    AddMember,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule
  ],
  templateUrl: './teams-list.html',
  styleUrl: './teams-list.css',
})
export class TeamsList implements OnInit {
  protected teamsService = inject(TeamService);
  
  // הורדנו את isLoading - האינטרספטור מטפל בזה גלובלית!
  
  showAddTeam = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  selectedTeamId = signal<number | null>(null);

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.errorMessage.set(null);
    this.teamsService.loadTeams().subscribe({
      next: () => {
      },
      error: () => {
        this.errorMessage.set('Could not load teams. Please refresh.');
      }
    });
  }
}