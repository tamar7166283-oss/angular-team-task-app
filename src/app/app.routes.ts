import { Routes } from '@angular/router';
import { Register } from './components/auth/register/register';
import { Login } from './components/auth/login/login';
import { authGuard } from './guards/auth-guard';
import { TeamsList } from './components/teams-list/teams-list';
import { Projects } from './components/projects/projects';
import { TaskList } from './components/task-list/task-list';
import { TaskDetails } from './components/task-details/task-details';
import { AuthLayout } from './components/auth-layout/auth-layout';
import { MainLayout } from './components/main-layout/main-layout';


export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'register', component: Register },
      { path: 'login', component: Login },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: 'teams', component: TeamsList },
      { path: 'teams/:teamId/projects', component: Projects },
      { path: 'projects', component: Projects },
      {
        path: 'projects/:projectId/tasks',
        component: TaskList,
        children: [
          { path: ':taskId', component: TaskDetails }
        ]
      }
    ]
  },

  { path: '**', redirectTo: 'not-found' }
];