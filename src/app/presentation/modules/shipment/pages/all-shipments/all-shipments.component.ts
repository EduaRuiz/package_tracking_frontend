import { Component, OnInit } from '@angular/core';
import { PackageTrackingDelegate } from '@application/delegator';
import { ShipmentModel } from '@infrastructure/models';

@Component({
  selector: 'app-all-shipments',
  templateUrl: './all-shipments.component.html',
  styleUrls: ['./all-shipments.component.scss'],
})
export class AllShipmentsComponent implements OnInit {
  originAddress = 'originAddress';
  shipment = new ShipmentModel(
    'description' as any,
    { name: 'CREATED', description: 'Created on' },
    new Date(),
    new Date(),
    {} as any,
    this.originAddress as any,
    'destinationAddress' as any
  );

  shipments!: ShipmentModel[];

  constructor(private readonly getShipmentsUC: PackageTrackingDelegate) {
    console.log(this.shipment);
  }

  ngOnInit(): void {
    this.getShipmentsUC.toGetShipmentsByUser();
    this.getShipmentsUC.execute().subscribe((shipments) => {
      console.log(shipments);
    });
  }
}
