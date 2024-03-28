import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';

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

  private isSignedIn: boolean = false;

  public hide: boolean = true;

  public registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
  })

  onRegister() {
    this.isSignedIn = this.registerForm.valid;
    if (this.isSignedIn) {
      console.log(this.registerForm.value);
      this.router.navigateByUrl('/home');
    }
  }

  public navigateToLogin() {
    this.router.navigateByUrl("/auth")
  }

}
