import { createReducer, on } from '@ngrx/store';
import * as vehicle from '../actions/vehicle.actions';

export interface State {
    vehicleList: any[],
    query: string;
    term: string;
}
  
export const initialState: State = {
    vehicleList: [],
    query: '',
    term: '',
};

export const vehicleReducer = createReducer(
  initialState,
    on(vehicle.addVehicle, (state, { vehicleInfo }) =>  {return {...state, vehicleList: [vehicleInfo, ...state.vehicleList]}}),
    on(vehicle.editVehicle, (state, { vehicleInfo, index }) => {
        let editedVehicleList = [...state.vehicleList];
        editedVehicleList[index] = { vehicle: vehicleInfo };
        return { ...state, vehicleList: editedVehicleList }
    }),
    on(vehicle.removeVehicle, (state, { vehicleInfo, index}) => {
        let removedVehicleList = [...state.vehicleList]
        removedVehicleList.splice(index, 1)
        return { ...state, vehicleList: removedVehicleList }
    }),
    on(vehicle.loadVehicle, (state) => state),
    on(vehicle.loadVehicleSuccess, (state, { vehicleList }) => {
        return { ...state, vehicleList }
    }),
    on(vehicle.search, (state, { term }) => {
        return { ...state, term, results: [], loading: true }
    }), 
    on(vehicle.searchSuccess, (state, { vehicleList }) => { return {...state, vehicleList, loading: false}})
    
);