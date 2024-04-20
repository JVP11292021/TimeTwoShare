import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PersistanceStorageService } from 'src/app/shared/services/persistance-storage.service';
import { ACCESS_TOKEN_STORED_NAME, REFRESH_TOKEN_STORED_NAME } from 'src/app/shared/globals';

@Component({
  selector: 'app-sing-in-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {

  // TODO connect to backend verification
  // TODO Save token returned from back-end for further api calls

  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private auth: AuthService = inject(AuthService);
  private storage: PersistanceStorageService = inject(PersistanceStorageService);

  public hide: boolean = true;
  public invalid: boolean = false;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(1)]]
  })


  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
  
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
  
    this.auth.simpleAuthentication({ email, password }).subscribe(response => {
      if (response.state === "VALID") {
        this.handleValidLogin(response);
      } else {
        this.handleInvalidLogin(email, password);
      }
    });
  }
  
  private handleValidLogin(response: any) {
    const accessToken = response.access_token;
    const refreshToken = response.refresh_token;
  
    this.storage.saveData(ACCESS_TOKEN_STORED_NAME, accessToken);
    this.storage.saveData(REFRESH_TOKEN_STORED_NAME, refreshToken);
    this.router.navigateByUrl("/admin");
  }
  
  private handleInvalidLogin(email: string, password: string) {
    const refreshToken = this.storage.getData(REFRESH_TOKEN_STORED_NAME);
  
    this.auth.refreshAccessToken(refreshToken).subscribe(
      refreshedResponse => {
        this.auth.getLatestAccessTokenByEmail(email).subscribe(
          tokenResponse => {
            if (tokenResponse === "Invalid") {
              this.invalid = true;
            } else {
              this.authenticateWithRefreshedToken(email, password, tokenResponse);
            }
          },
          error => {
            this.invalid = true;
          }
        );
      },
      error => {
        this.invalid = true;
      }
    );
  }
  
  private authenticateWithRefreshedToken(email: string, password: string, tokenResponse: any) {
    this.auth.authenticate({ email, password }, tokenResponse).subscribe(
      response => {
        if (response.state === "VALID") {
          this.handleValidLogin(response);
        }
      }
    );
  }

  navigateToRegister() {
    this.router.navigateByUrl('/auth/register');
  }
}
