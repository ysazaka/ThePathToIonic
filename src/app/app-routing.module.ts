import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule), canActivate: [LoginGuard] },
  { path: 'user-data', loadChildren: () => import('./pages/user-data/user-data.module').then( m => m.UserDataPageModule), canActivate: [AuthGuard] },
  { path: 'achievement', loadChildren: () => import('./pages/achievement/achievement.module').then( m => m.AchievementPageModule), canActivate: [AuthGuard] },
  { path: 'content/:id', loadChildren: () => import('./pages/content/content.module').then( m => m.ContentPageModule), canActivate: [AuthGuard] },
  { path: 'splash', loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule) }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
