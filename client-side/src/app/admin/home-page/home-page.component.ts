import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialExpandedModule } from 'src/app/shared/material/material-expanded.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PersistanceStorageService } from 'src/app/shared/services/persistance-storage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MaterialExpandedModule,
    RouterModule,
    MaterialModule,
  ]
})
export class HomePageComponent {

  private auth = inject(AuthService);
  private storage = inject(PersistanceStorageService);
  private router = inject(Router);

  public logout() {
    this.auth.logout();
    this.storage.clearStorage();
    this.router.navigateByUrl('http://localhost:4200')
  }
}
