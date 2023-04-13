import { Component, OnInit } from '@angular/core';
import { PackageTrackingDelegate } from '@application/delegator';
import { tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
