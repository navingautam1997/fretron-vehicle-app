import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as VehicleAction from '../actions/vehicle.actions'
import { VehicleService } from "../services/vehicle.service";
import { EMPTY, catchError, map, mergeMap, of, switchMap, tap } from "rxjs";

@Injectable()
export class VehicleEffects{

    loadVehicle$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VehicleAction.loadVehicle),
            switchMap(() => this.vehicleService.getVehicle().pipe(
                map((res: any) => {
                    return VehicleAction.loadVehicleSuccess({ vehicleList: res.data })
                }),
                catchError(() => EMPTY)
            ))
        )
    })

    // addVehicle$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(VehicleAction.addVehicle),
    //         switchMap((vehicleInfo) => this.vehicleService.addVehicle(vehicleInfo).pipe(
    //             map((vehicleInfo: any) => {
    //                 console.log(vehicleInfo);
    //                 return VehicleAction.addVehicleSuccess({ vehicleList: vehicleInfo })
    //             }),
    //             catchError(() => EMPTY)
    //         ))
    //     )
    // })

    // editVehicle$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(VehicleAction.editVehicle),
    //         switchMap((vehicleInfo) => this.vehicleService.editVehicle(vehicleInfo).pipe(
    //             map(vehicleInfo => VehicleAction.editVehicle({ vehicleInfo: vehicleInfo })),
    //             catchError(() => EMPTY)
    //         ))
    //     )
    // })

    // removeVehicle$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(VehicleAction.removeVehicle),
    //         switchMap((vehicleInfo) => this.vehicleService.deleteVehicle(vehicleInfo).pipe(
    //             map(vehicleInfo => VehicleAction.removeVehicle({ vehicleInfo: vehicleInfo })),
    //             catchError(() => EMPTY)
    //         ))
    //     )
    // })

    search$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(VehicleAction.search),
            mergeMap((action:any) => this.vehicleService.getVehicle().pipe(
                map((data: any) => {
                    let searchedList = [];
                    searchedList = data.data.filter((item:any) => {
                        return item.vehicle.vehicleRegistrationNumber.includes(action.term);
                    })
                    return VehicleAction.searchSuccess({ vehicleList: searchedList })
                })
            )),
        )
    });

    constructor(private actions$: Actions, private vehicleService: VehicleService) { }

}