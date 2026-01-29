import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/authService';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {
authService = inject(AuthService);
}
