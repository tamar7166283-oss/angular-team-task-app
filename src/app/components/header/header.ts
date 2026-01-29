import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/authService';
import { ThemeService } from '../../services/theme-service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  
  isProfileOpen = false;

  logout() {
    this.authService.logOut();
  }
}
