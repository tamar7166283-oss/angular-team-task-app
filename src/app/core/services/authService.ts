import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginCredentials, RegisterCredentials } from '../../models/auth.model';
import { StorageService } from './storageService';
import { User } from '../../models/user.model';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private http = inject(HttpClient);
  private storage = inject(StorageService);
  private AUTH_URL= `http://localhost:3000/api/auth`;
  router = inject(Router);

  currentUser = signal<User|null>(this.storage.getUser());
  currentToken = signal<string|null>(this.storage.getToken());

  login(credentials: LoginCredentials) {
    return this.http.post<AuthResponse>(`${this.AUTH_URL}/login`, credentials)
    .pipe(tap(res=>this.handleAuth(res)));
  }

  register(credentials: RegisterCredentials) {
    return this.http.post<AuthResponse>(`${this.AUTH_URL}/register`, credentials)
    .pipe(tap(res=>this.handleAuth(res)));
  }

  logOut():void{
    this.storage.clear();
    this.currentToken.set(null);
    this.currentUser.set(null);
    this.router.navigate(['/login'])
  }

  private handleAuth(res:AuthResponse):void{
    this.storage.setToken(res.token);
    this.storage.setUser(res.user);
    this.currentToken.set(res.token);
    this.currentUser.set(res.user);
  }
}
