import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppComponent } from './pages';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@presentation/shared/interceptors';
import { ComponentsModule } from '@presentation/components';
import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InfrastructureModule,
    ComponentsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
