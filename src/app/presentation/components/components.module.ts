import { NgModule } from '@angular/core';
import { TypewriterComponent } from './typewriter';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar';

@NgModule({
  declarations: [TypewriterComponent, NavbarComponent],
  imports: [RouterModule],
  exports: [TypewriterComponent, NavbarComponent],
  providers: [],
})
export class ComponentsModule {}
