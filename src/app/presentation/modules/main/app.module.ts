import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppComponent } from './pages';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@presentation/shared/interceptors';

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [BrowserModule, AppRoutingModule, InfrastructureModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
