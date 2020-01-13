import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'xp', loadChildren: () => import('./pages/xp/xp.module').then( m => m.XpPageModule), canActivate: [AuthGuard] },
  { path: 'user-data', loadChildren: () => import('./pages/user-data/user-data.module').then( m => m.UserDataPageModule), canActivate: [AuthGuard] },
  { path: 'achievement', loadChildren: () => import('./pages/achievement/achievement.module').then( m => m.AchievementPageModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule), canActivate: [LoginGuard] },
  { path: 'content', loadChildren: () => import('./pages/content/content.module').then( m => m.ContentPageModule), canActivate: [AuthGuard] },
  { path: 'content/:id', loadChildren: () => import('./pages/content/content.module').then( m => m.ContentPageModule), canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
