import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CoursesComponent } from './pages/academy/courses/courses.component';
import { SummaryComponent } from './pages/academy/summary/summary.component';
import { AcademyComponent } from './pages/academy/academy.component';
import { SoyanaComponent } from './pages/soyana/soyana.component';
import { SigningUpComponent } from './pages/signing-up/signing-up.component';
import { SigningConfirmComponent } from './pages/signing-confirm/signing-confirm.component';
import { EventoInscriptionComponent } from './pages/evento-inscription/evento-inscription.component';
import { InscriptionsListComponent } from './pages/inscriptions-list/inscriptions-list.component';

const routes: Routes = [
  {path: 'home'   , component: HomeComponent},
  {path: 'soyana'   , component: SoyanaComponent},
  {path : 'courses', component: CoursesComponent, canActivate: [ AuthGuard ]},
  {path : 'summary', component: SummaryComponent, canActivate: [ AuthGuard ]},
  { path: 'login'   , component: LoginComponent },
  { path: 'register' , component : RegisterComponent},
  { path: 'inscripcion-talleres' , component : SigningUpComponent},
  { path: 'inscripcion-virago' , component : EventoInscriptionComponent},
  { path: 'inscriptions-list' , component : InscriptionsListComponent},
  { path: 'signing-confirm' , component : SigningConfirmComponent},
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
