import { inject, Injectable, signal } from '@angular/core';
import { AddMember, Team } from '../models/team.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private http = inject(HttpClient);
  private _teams = signal<Team[]>([]);
  readonly teams = this._teams.asReadonly();

  loadTeams():Observable<Team[]> {
    return this.http.get<Team[]>(`${environment.apiUrl}/teams`)
    .pipe(tap(data => this._teams.set(data)))
  };

  createTeam(name: string):Observable<Team>{
   return this.http.post<Team>(`${environment.apiUrl}/teams`,{name})
   .pipe(tap(newTeam => this._teams.update(list => [...list, newTeam])))
  };
 addMember(teamId: number, memberData: AddMember): Observable<void> {
  const url = `${environment.apiUrl}/teams/${teamId}/members`;
  return this.http.post<any>(url, memberData).pipe(
    tap(() => {
      this._teams.update(teams => teams.map(t => 
        t.id === teamId ? { ...t, members_count: t.members_count + 1 } : t
        
      ));
    })
  );
}
  }  

