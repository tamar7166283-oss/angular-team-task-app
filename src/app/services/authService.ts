import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { StorageService } from './storageService';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthResponse, LoginCredentials, RegisterCredentials } from '../models/auth.model';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private http = inject(HttpClient);
  private storage = inject(StorageService);
  private AUTH_URL= `${environment.apiUrl}/auth`;
  router = inject(Router);

  private _currentUser = signal<User | null>(this.storage.getUser());
  private _currentToken = signal<string | null>(this.storage.getToken());

  readonly currentUser = this._currentUser.asReadonly();
  readonly currentToken = this._currentToken.asReadonly();

  readonly isAuthenticated = computed(() => !!this._currentUser());
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
    this._currentToken.set(null);
    this._currentUser.set(null);
    this.router.navigate(['/login'])
  }

  private handleAuth(res:AuthResponse):void{
    this.storage.setToken(res.token);
    this.storage.setUser(res.user);
    this._currentToken.set(res.token);
    this._currentUser.set(res.user);
  }
}
