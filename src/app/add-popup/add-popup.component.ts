import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessPopupComponent } from '../success-popup/success-popup.component';
import { VehicleService } from '../services/vehicle.service';
import { Store } from '@ngrx/store';
import * as VehicleAction from '../actions/vehicle.actions'
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, debounceTime, distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-add-popup',
  templateUrl: './add-popup.component.html',
  styleUrls: ['./add-popup.component.css']
})
export class AddPopupComponent implements OnInit {
  searchInput$ = new BehaviorSubject<any>(null);
  vehicleTypeList: any[] = []
  myControl = new FormControl<string | any>("");
  options: any[] = [];
  filteredOptions?: Observable<any[]>;


  constructor(
    public dialogRef: MatDialogRef<AddPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private vehicle: VehicleService,
    private store: Store
  ) {
    this.getVehicleType("").subscribe((results: any) => {
      // console.log(results.data)
      this.options = results.data
    })

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options?.slice();
      }),
    );
  }
  ngOnInit(): void {
    // this.searchInput$
    //   .pipe(
    //     debounceTime(300),
    //     distinctUntilChanged(),
    //     switchMap((query) => this.getVehicleType(query?.target?.value))
    //   )
    //   .subscribe((results: any) => {
    //     this.vehicleTypeList = results.data;
    //     this.options = results.data
    //   });
    
      
  }

  displayFn(user: any): string {
    return user;
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option: any) => option.name.toLowerCase().includes(filterValue));
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  openSuccessPopup() {
    // console.log(this.data);
    if (this.data?.isEdit) {
      console.log(this.data.vehicleType)
      this.store.dispatch(VehicleAction.editVehicle({ vehicleInfo: this.data, index: this.data.index }))
    } else {
      this.store.dispatch(VehicleAction.addVehicle({ vehicleInfo: { vehicle: this.data } }));
      this._snackBar.openFromComponent(SuccessPopupComponent, {duration: 5000});
    }
    
  }

  getVehicleType(searchedText: any) {
   return this.vehicle.getVehicleType(searchedText)
      // .subscribe((data: any) => {
      // this.vehicleTypeList = data.data;
      // console.log(this.vehicleTypeList)
    // })
  }

  // searchVehicleType() {
  //    this.getVehicleType('').subscribe((data: any)=>data.data)
  // }
}
