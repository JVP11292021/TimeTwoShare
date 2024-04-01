import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MaterialExpandedModule } from 'src/app/shared/material/material-expanded.module';



@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MaterialExpandedModule,
    RouterModule
  ],
  exports: [
    LandingComponent
  ]
})
export class LandingModule { }
