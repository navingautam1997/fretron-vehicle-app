import { createAction, props } from '@ngrx/store';
import { State } from '../reducer/vehicle.reducer';

// export const addVehicle = createAction('Add Vehicle', props<{ vehicleInfo: {} }>());
// export const loadVehicle = createAction('Load vehicle');
// export const removeVehicle = createAction('Remove Vehicle', props<{vehicleInfo:{}}>());
// export const editVehicle = createAction('Edit Vehicle', props<{ vehicleInfo: {} }>());

export const loadVehicle = createAction('Load vehicle');
export const loadVehicleSuccess = createAction('[Vehicle] Load Success', props<{vehicleList: any[]}>());
export const addVehicle = createAction('[Vehicle] Add', props<{ vehicleInfo: {} }>());
// export const addVehicleSuccess = createAction('[Vehicle] Add Success', props<{vehicleList: any[]}>())
export const removeVehicle = createAction('[Vehicle] Remove', props<{ vehicleInfo: any, index: any }>());
export const editVehicle = createAction('[Vehicle] Edit', props<{ vehicleInfo: {}, index: any }>());
export const search = createAction('[Home] Search', props<{term: string}>());
export const searchSuccess = createAction('[Home] Search Success', props<{vehicleList: any[]}>());


