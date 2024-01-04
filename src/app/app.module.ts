import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { AddPopupComponent } from './add-popup/add-popup.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SuccessPopupComponent } from './success-popup/success-popup.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule} from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { vehicleReducer } from './reducer/vehicle.reducer';
import { EffectsModule } from '@ngrx/effects';
import { VehicleEffects } from './effects/vehicle.effects';
import {MatTableModule} from '@angular/material/table';
import { DeletePopupComponent } from './delete-popup/delete-popup.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    AddPopupComponent,
    SuccessPopupComponent,
    DeletePopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDividerModule,
    MatTableModule,
    MatMenuModule,
    MatAutocompleteModule,
    StoreModule.forRoot({ vehicleState: vehicleReducer }),
    EffectsModule.forRoot([VehicleEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
