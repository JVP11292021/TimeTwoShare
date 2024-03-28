import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';

const routes: Routes = [

  // {
  //   path: 'home',
  //   loadChildren: () =>
  //     import("src/app/pages/home-page/home.route").then((m) => m.homePageRoutes) 
  // },

  // { 
  //   path: '**',
  //   redirectTo: 'auth' 
  // },
  {
    path: '',
    loadChildren: () => import('./public/public.module').then((m) => m.PublicModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then((m) => m.adminRoutes),
    canActivate: [authGuard]
  },
  {
    path: 'auth',
    loadChildren: () =>
      import("src/app/pages/auth/auth.route").then((m) => m.authRoutes),
  },
  { 
    path: '**',
    redirectTo: '' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
