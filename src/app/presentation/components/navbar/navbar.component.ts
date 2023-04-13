import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageTrackingDelegate } from '@application/delegator';
import { AuthModel } from '@infrastructure/models';
import { tap } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  homePath!: string[];
  signOutPath!: string[];
  currentUser!: AuthModel;

  constructor(
    // private readonly signOutUC: PackageTrackingDelegate,
    private readonly router: Router
  ) {
    this.homePath = ['dashboard'];
    this.signOutPath = ['../index'];
    this.currentUser = JSON.parse(
      localStorage.getItem('user') ?? JSON.stringify('')
    );
  }

  ngOnInit(): void {}

  signOut(): void {
    localStorage.clear();
    // this.signOutUC.toSignOut();
    // this.signOutUC.execute().subscribe({
    //   next: () => this.router.navigate(this.signOutPath),
    // });
  }
}
