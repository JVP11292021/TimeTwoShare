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
    if (this.loginForm.valid) {
      const jwtToken : string = this.storage.getData(ACCESS_TOKEN_STORED_NAME);
      this.auth.simpleAuthentication({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      })
      .subscribe((response) => {
        if (response.state == "VALID") {
          this.storage.saveData(ACCESS_TOKEN_STORED_NAME, response.access_token);
          this.storage.saveData(REFRESH_TOKEN_STORED_NAME, response.refresh_token);
          this.router.navigateByUrl("/admin")
        }
        else {
          this.auth.refreshAccessToken(this.storage.getData(REFRESH_TOKEN_STORED_NAME))
          .subscribe((response) => 
              this.auth.getLatestAccessTokenByEmail(this.loginForm.value.email)
                .subscribe((response) => {
                  if (response == "Invalid") this.invalid = true;
                  else 
                    this.auth.authenticate({
                      email: this.loginForm.value.email,
                      password: this.loginForm.value.password
                    }, response)
                    .subscribe((response) => {
                      if (response.state == "VALID") {
                        this.storage.saveData(ACCESS_TOKEN_STORED_NAME, response.access_token);
                        this.storage.saveData(REFRESH_TOKEN_STORED_NAME, response.refresh_token);
                        this.router.navigateByUrl("/admin")
                      };
                    });
                },
                (error) => this.invalid = true
                ));
        }
      });
      return;
    }
  }

  navigateToRegister() {
    this.router.navigateByUrl('/auth/register');
  }
}
