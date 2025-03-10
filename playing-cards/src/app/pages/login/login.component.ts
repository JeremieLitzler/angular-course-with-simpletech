import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ICredentials, AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  loginFormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  loginSubscription: Subscription | null = null;

  invalidCredentials = false;

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }

  login() {
    this.loginSubscription = this.authService
      .login(this.loginFormGroup.value as ICredentials)
      .subscribe({
        next: (result: User | null | undefined) => {
          console.log(`next`, result);
          this.navigateHome();
        },
        error: () => {
          this.invalidCredentials = true;
        },
      });
  }

  navigateHome() {
    this.router.navigate(['home']);
  }
}
