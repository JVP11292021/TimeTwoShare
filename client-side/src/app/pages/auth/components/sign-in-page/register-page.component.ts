import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
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
    ReactiveFormsModule
  ],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  // TODO connect to backend for verification calls

  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private auth: AuthService = inject(AuthService);
  private storage: PersistanceStorageService = inject(PersistanceStorageService);

  public hide: boolean = true;

  public registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
  })

  onRegister() {
    if (this.registerForm.valid) {
      const value = this.registerForm.value;
      this.auth.register({
        firstname: value.firstname,
        lastname: value.lastname,
        email: value.email,
        password: value.password,
        role: 'USER'
      })
      .subscribe((response) => {
        this.storage.saveData(ACCESS_TOKEN_STORED_NAME, response.access_token);
        this.storage.saveData(REFRESH_TOKEN_STORED_NAME, response.refresh_token);
        this.navigateToLogin();
      });
    }
  }

  public navigateToLogin() {
    this.router.navigateByUrl("/auth")
  }

}
