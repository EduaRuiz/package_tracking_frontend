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

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InfrastructureModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
