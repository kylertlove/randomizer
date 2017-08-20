import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MdButtonModule, MdCheckboxModule, MdToolbarModule, MdRadioModule,
   MdSnackBarModule, MdGridListModule, MdInputModule, MdTabsModule, MdCardModule,
    MdDialogModule, MdSelectModule, MdTooltipModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import {NgxElectronModule} from 'ngx-electron';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { TeamsComponent } from './teams/teams.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    TeamsComponent
  ],
  imports: [
    BrowserModule, MdButtonModule, MdCheckboxModule, HttpModule, NgxElectronModule, MdToolbarModule, MdGridListModule,
    MdSnackBarModule, BrowserAnimationsModule, MdInputModule, FormsModule, MdRadioModule, MdTabsModule, MdCardModule, 
    MdDialogModule, MdSelectModule, MdTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AboutComponent, TeamsComponent
  ]
})
export class AppModule { }
