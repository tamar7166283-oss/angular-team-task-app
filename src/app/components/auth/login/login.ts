import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/authService';

import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule,ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage = signal<string | null>(null);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.errorMessage.set(null);

      this.authService.login(this.loginForm.value as any).subscribe({
        next: () => {
          console.log("Login successful");
          this.router.navigate(['/teams']);
        },
        error: (err) => {
          console.error("Login failed", err);
          this.errorMessage.set("Invalid email or password. Please try again.");
        }
      });
    }
  }
}
