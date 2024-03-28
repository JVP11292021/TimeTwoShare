import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import("src/app/pages/auth/auth.route").then((m) => m.authRoutes) 
  },
  {
    path: 'home',
    loadChildren: () =>
      import("src/app/pages/home-page/home.route").then((m) => m.homePageRoutes) 
  },

  { 
    path: '**',
    redirectTo: 'home' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
