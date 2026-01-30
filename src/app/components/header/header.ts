import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/authService';
import { ThemeService } from '../../services/theme-service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoadingService } from '../../services/loading-service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { UpperCasePipe } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterLinkActive,MatProgressBarModule,UpperCasePipe,
    MatIconModule,MatButtonModule,MatDividerModule,
    MatSlideToggleModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  loadingService = inject(LoadingService);
  isProfileOpen = false;

  logout() {
    this.authService.logOut();
  }
}
