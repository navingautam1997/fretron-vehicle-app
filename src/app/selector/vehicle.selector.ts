import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "../reducer/vehicle.reducer";

export const vehicleState = (state: State) => state;
// export const vehicleState = createSelector(vehicleList, (vehicle:State)=> vehicle.vehicleList)

export const selectSearchState = createFeatureSelector<State>('search');

export const selectSearchQuery = createSelector(
  selectSearchState,
  (state) => state.query
);