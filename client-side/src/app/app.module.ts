import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PublicModule } from './public/public.module';
import { MaterialExpandedModule } from './shared/material/material-expanded.module';
import { MaterialModule } from './shared/material/material.module';
import { ProductPopUpComponent } from './admin/products/product-pop-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContractPopUpComponent } from './admin/products/contract-pop-up.component';
import { MoreInfoPopUpComponent } from './admin/products/more-info-pop-up.component';
import { ReviewPopUpComponent } from './admin/products/review-pop-up.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductPopUpComponent,
    ContractPopUpComponent,
    MoreInfoPopUpComponent,
    ReviewPopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PublicModule,
    MaterialExpandedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
