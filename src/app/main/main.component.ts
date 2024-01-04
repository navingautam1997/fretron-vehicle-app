import { Component, OnInit } from '@angular/core';
import { vehicleInfo } from '../models/vehicleInfo.model';
import { VehicleService } from '../services/vehicle.service';
import { Store } from '@ngrx/store';
import { vehicleState } from '../selector/vehicle.selector';
import * as VehicleActions from '../actions/vehicle.actions'
import { State } from '../reducer/vehicle.reducer';
import { AddPopupComponent } from '../add-popup/add-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  vehicleInfoList?: any[]

  constructor(public dialog: MatDialog, private vehicle: VehicleService, private store: Store) {
    this.store.select((state) => { return state }).subscribe((data) => {
      // console.log(data)
    })
  }
  ngOnInit(): void {
    this.store.dispatch(VehicleActions.loadVehicle());
    this.store.select((state) => state).subscribe((data: any) => {
      this.vehicleInfoList = data.vehicleState.vehicleList
    })
  }

  openEditDialog(vehicle: any, i:any): void {
    const dialogRef = this.dialog.open(AddPopupComponent, {
      width: '50vw',
      data: {
        vehicleRegistrationNumber: vehicle?.vehicleRegistrationNumber,
        vehicleType: vehicle?.vehicleType,
        vehicleModel: vehicle?.vehicleModel,
        chassisNumber: vehicle?.chassisNumber,
        index: i,
        isEdit: true
      }
    }
    );

    dialogRef.afterClosed().subscribe((result: vehicleInfo) => {
      console.log('The dialog was closed');
      // console.log(result, i)
    });
  }

  openDeletePopup(vehicleRegistrationNumber: string, i:any) {
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '50vw',
      data: {
        vehicleRegistrationNumber: vehicleRegistrationNumber,
        index: i
      }
    });
    dialogRef.afterClosed().subscribe((result: vehicleInfo) => {
      console.log('The dialog was closed');
    });

  }

}
