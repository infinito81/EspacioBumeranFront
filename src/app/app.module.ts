import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

import { RegisterComponent } from './pages/register/register.component';
import { NavbarmainComponent } from './components/navbarmain/navbarmain.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { CoursesComponent } from './pages/academy/courses/courses.component';
import { CardComponent } from './components/card/card.component';

import { ImagesPipe } from './pipes/images.pipe';
import { SummaryComponent } from './pages/academy/summary/summary.component';
import { NavsidepartComponent } from './components/navsidepart/navsidepart.component';
import { TopnavbarComponent } from './components/topnavbar/topnavbar.component';
import { AcademyComponent } from './pages/academy/academy.component';
import { SoyanaComponent } from './pages/soyana/soyana.component';
import { SigningUpComponent } from './pages/signing-up/signing-up.component';
import { SigningConfirmComponent } from './pages/signing-confirm/signing-confirm.component';
import { EventoInscriptionComponent } from './pages/evento-inscription/evento-inscription.component';
import { InscriptionsListComponent } from './pages/inscriptions-list/inscriptions-list.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarmainComponent,
    CoursesComponent,
    CardComponent,
    ImagesPipe,
    SummaryComponent,
    NavsidepartComponent,
    TopnavbarComponent,
    AcademyComponent,
    SoyanaComponent,
    SigningUpComponent,
    SigningConfirmComponent,
    EventoInscriptionComponent,
    InscriptionsListComponent,
    CarruselComponent,
    NavbarComponent   
  ],
  imports: [
    BrowserModule,
    MatSidenavModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
