import { Component } from '@angular/core';
import { AddPopupComponent } from '../add-popup/add-popup.component';
import { vehicleInfo } from '../models/vehicleInfo.model';
import {
  MatDialog,
} from '@angular/material/dialog';
import { VehicleService } from '../services/vehicle.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { Store } from '@ngrx/store';
import * as VehicleAction from '../actions/vehicle.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  vehicleType: any;
  vehicleModel: any;
  chassisNumber: any;
  vehicleId: any;
  vehicleRegistrationNumber: any;

  vehicleInfo?: vehicleInfo;
  

  constructor(public dialog: MatDialog, private vehicle: VehicleService, private store: Store) {
    this.store.select((state) => { return state }).subscribe((data) => {
      // console.log(data)
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPopupComponent, {
      width: '50vw',
      // height: '50vh',
      data: {
        vehicleRegistrationNumber: this.vehicleRegistrationNumber,
        vehicleType: this.vehicleType,
        vehicleModel: this.vehicleModel,
        chassisNumber: this.chassisNumber,
        vehicleId: this.vehicleId,
      }
    }
    );

    dialogRef.afterClosed().subscribe((result: vehicleInfo) => {
      console.log('The dialog was closed');
      console.log(result)
    });
  }

  searchVehicle(key: any) {
    this.store.dispatch(VehicleAction.search({ term: key.target.value }));
  }

}
