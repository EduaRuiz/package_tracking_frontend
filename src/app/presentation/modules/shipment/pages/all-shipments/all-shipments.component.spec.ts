import { AllShipmentsComponent } from './all-shipments.component';
import { PackageTrackingDelegate } from '@application/delegator';
import { ShipmentModel } from '@infrastructure/models';
import { of } from 'rxjs';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

describe('AllShipmentsComponent', () => {
  let component: AllShipmentsComponent;
  let fixture: ComponentFixture<AllShipmentsComponent>;
  let mockGetShipmentsUC: PackageTrackingDelegate;

  beforeEach(async () => {
    mockGetShipmentsUC = {
      toGetShipmentsByUser: jest.fn(),
      execute: jest.fn().mockReturnValue(of([])),
    } as unknown as PackageTrackingDelegate;

    await TestBed.configureTestingModule({
      declarations: [AllShipmentsComponent],
      providers: [
        { provide: PackageTrackingDelegate, useValue: mockGetShipmentsUC },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllShipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
    expect(component.showContent).toBe(false);
    expect(component.shipments).toEqual([]);
  });

  describe('ngOnInit', () => {
    it('should call toGetShipmentsByUser and set shipments, loading and showContent properties', fakeAsync(() => {
      // Arrange
      const shipment1 = new ShipmentModel(
        'description 1' as any,
        { name: 'CREATED', description: 'Created on' },
        new Date(),
        new Date(),
        {} as any,
        'originAddress 1' as any,
        'destinationAddress 1' as any
      );
      const shipment2 = new ShipmentModel(
        'description 2' as any,
        { name: 'CREATED', description: 'Created on' },
        new Date(),
        new Date(),
        {} as any,
        'originAddress 2' as any,
        'destinationAddress 2' as any
      );
      const shipments = [shipment1, shipment2];
      jest.spyOn(mockGetShipmentsUC, 'execute').mockReturnValue(of(shipments));

      // Act
      component.ngOnInit();

      // Assert
      expect(mockGetShipmentsUC.toGetShipmentsByUser).toHaveBeenCalled();
      expect(mockGetShipmentsUC.execute).toHaveBeenCalled();
      expect(component.shipments).toEqual(shipments);
      expect(component.loading).toBe(false);
      expect(component.showContent).toBe(false);
      //Simulate setTimeout
      tick(1000);
      expect(component.showContent).toBe(true);
    }));
  });
});
