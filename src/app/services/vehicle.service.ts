import { Injectable } from '@angular/core';
import { vehicleInfo } from '../models/vehicleInfo.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../reducer/vehicle.reducer';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  vehicleInfoList = new BehaviorSubject<any>([])
  url: string = "https://apis.fretron.com/shipment-view/partner-fleet/fleets/v2?size=50"
  header = new HttpHeaders().set(
    "Authorization",
    "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDMyMjU4NzgsInVzZXJJZCI6IjBmZDZhN2FjLTVhMmEtNDJlYy04ZmIyLWJmMzY4Y2YzODJjNyIsImVtYWlsIjoiZGl2eWFuc2hpLmd1cHRhQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiNzgzMTA2MjA5MSIsIm9yZ0lkIjoiNDk1Yjg3MjgtYzc2MS00ZmE3LTgzZmUtZGI3NWE3ZDYzMjIxIiwibmFtZSI6IkRpdnlhbnNoaSBHdXB0YSIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.GRaGEvH8wy9jL6isMfUYwZcc2NkUKSxLGJ_COxsEDCw"
  );
  constructor(private http: HttpClient, private store: Store) { }

  addVehicle(vehicle: any) {
    return new Observable((observer) => {
      let vehicleInfoList:any[] = []
      this.store.select((state) => state).subscribe((state: any) => {
        console.log(state?.vehicleState?.vehicleList);
        console.log(vehicle.vehicleInfo)
        state?.vehicleState?.vehicleList.push(vehicle.vehicleInfo)
      })
      observer.next(vehicleInfoList)
      observer.complete()
    })
  }

  getVehicle() {
    return this.http.get(this.url, {headers:this.header});
  }

  deleteVehicle(vehicle: any) {
    console.log(vehicle)
    return this.http.delete(`this.url`);
  }

  editVehicle(vehicle: any) {
    return this.http.put(this.url, vehicle);
  }

  getVehicleType(searchedText: any) {
    let params = new HttpParams()
      .set('limit', 50)
      .set('filter', JSON.stringify({"customerLoadTypes":[],"customerId":"","vehicleCategory":[],"passingCapacityMT":[],"dimensionString":[],"bodyType":[],"chassisType":['Truck'],"_id":[],"_not":{"name":[[]]}}))
      .set('search', [searchedText].toString());
    
     let header = new HttpHeaders().set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDM4MzU5OTksInVzZXJJZCI6IjhmNjhjYzA5LTExZGMtNDUxMC05MjJmLTY5OGY3YzgzNWQ3NiIsImVtYWlsIjoibmF2aW4uZ2F1dGFtQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiODIwODU5NDgzNiIsIm9yZ0lkIjoiNDk1Yjg3MjgtYzc2MS00ZmE3LTgzZmUtZGI3NWE3ZDYzMjIxIiwibmFtZSI6Ik5hdmluIEdhdXRhbSIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.HJvhLcTub1AnQ0sAIho6n1lv_lgP9j7dN2eIE1Oe-Oc"      );
    let url = "https://apis.fretron.com/order-manager-v2/load-types/v1/load-types/v2"
    return this.http.get(url, {headers:header, params: params})
  }
}

// ?limit=50&search=&filters=%7B%22customerLoadTypes%22%3A%5B%5D%2C%22customerId%22%3A%22%22%2C%22vehicleCategory%22%3A%5B%5D%2C%22passingCapacityMT%22%3A%5B%5D%2C%22dimensionString%22%3A%5B%5D%2C%22bodyType%22%3A%5B%5D%2C%22chassisType%22%3A%5B%5D%2C%22_id%22%3A%5B%5D%2C%22_not%22%3A%7B%22name%22%3A%5B%5B%5D%5D%7D%7D
// Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDM4MzU5OTksInVzZXJJZCI6IjhmNjhjYzA5LTExZGMtNDUxMC05MjJmLTY5OGY3YzgzNWQ3NiIsImVtYWlsIjoibmF2aW4uZ2F1dGFtQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiODIwODU5NDgzNiIsIm9yZ0lkIjoiNDk1Yjg3MjgtYzc2MS00ZmE3LTgzZmUtZGI3NWE3ZDYzMjIxIiwibmFtZSI6Ik5hdmluIEdhdXRhbSIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.HJvhLcTub1AnQ0sAIho6n1lv_lgP9j7dN2eIE1Oe-Oc