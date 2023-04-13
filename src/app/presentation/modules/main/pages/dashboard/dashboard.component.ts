import { Component, OnInit } from '@angular/core';
import { PackageTrackingDelegate } from '@application/delegator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private readonly signInUC: PackageTrackingDelegate) {}

  ngOnInit() {}

  signOut() {
    this.signInUC.toSignOut();
    this.signInUC.execute().subscribe(() => {});
  }
}
