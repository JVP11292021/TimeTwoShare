import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialExpandedModule } from 'src/app/shared/material/material-expanded.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

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

}
