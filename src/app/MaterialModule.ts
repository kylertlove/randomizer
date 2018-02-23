import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule, MatCardModule, MatMenuModule, MatButtonModule, MatDialogModule,
    MatTooltipModule, MatToolbarModule, MatSidenavModule, MatTabsModule,
    MatSlideToggleModule, MatSnackBarModule, MatRadioModule, MatSelectModule,
    MatInputModule, MatCheckboxModule
  ],
  declarations: [],
  exports: [MatCardModule, MatMenuModule, MatButtonModule, MatDialogModule,
    MatTooltipModule, MatToolbarModule, MatSidenavModule, MatTabsModule,
    MatSlideToggleModule, MatSnackBarModule, MatRadioModule, MatSelectModule,
    MatInputModule, MatCheckboxModule
  ]
})
export class MaterialModule { }