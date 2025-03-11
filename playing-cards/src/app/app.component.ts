import { Component, inject, OnDestroy } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { Subscription } from 'rxjs';

// Import necessary modules for localization
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

//@Component is a decorator
@Component({
  // the custom element to declare the component in index.html
  selector: 'app-root',
  // replaced the NgModule paradigm used on older Angular version
  // TODO > to research because application won't all be using the
  // newest standalone feature
  standalone: true,
  // The HTML inline with the TS code
  template: '',
  templateUrl: './app.component.html',
  // The CSS styles inline with the TS code
  // styles: '',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, MatToolbar, MatIcon, MatButton],
})
export class AppComponent implements OnDestroy {
  router = inject(Router);
  authService = inject(AuthService);

  private logoutSubscription: Subscription | null = null;

  constructor() {
    // Register French locale data
    registerLocaleData(localeFr);
  }

  ngOnDestroy(): void {
    this.logoutSubscription?.unsubscribe();
  }

  navigateHome() {
    this.router.navigate(['home']);
  }
  navigateToLogin() {
    this.router.navigate(['login']);
  }

  logout() {
    this.logoutSubscription = this.authService.logout().subscribe({
      next: () => this.navigateToLogin(),
      error: (err) => {
        console.error(err);
      },
    });
  }
}
