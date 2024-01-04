import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as VehicleActions from '../actions/vehicle.actions'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.css']
})
export class DeletePopupComponent {

  constructor(
    public dialogRef: MatDialogRef<DeletePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store
  ) { }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  onProceed() {
    console.log(this.data);
    this.store.dispatch(VehicleActions.removeVehicle({vehicleInfo: this.data.result, index: this.data.i}))
  }
}
