import { Component, Output, EventEmitter, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { LucideAngularModule, User, Settings, LogOut, Menu } from 'lucide-angular';
import { filter } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressBarModule,
    RouterLink,
    LucideAngularModule,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() menuToggled = new EventEmitter<void>();

  readonly UserIcon = User;
  readonly SettingsIcon = Settings;
  readonly LogOutIcon = LogOut;
  readonly MenuIcon = Menu;

  private router = inject(Router);
  isLoading = false;

  constructor() {
    this.router.events.pipe(
      filter(event =>
        event instanceof NavigationStart ||
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      )
    ).subscribe(event => {
      this.isLoading = event instanceof NavigationStart;
    });
  }

  logout() {
    console.log('Logout clicked');
    // Implement Firebase signOut here
  }
}
