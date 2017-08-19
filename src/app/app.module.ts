import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MdButtonModule, MdCheckboxModule, MdToolbarModule, MdRadioModule,
   MdSnackBarModule, MdGridListModule, MdInputModule, MdTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import {NgxElectronModule} from 'ngx-electron';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, MdButtonModule, MdCheckboxModule, HttpModule, NgxElectronModule, MdToolbarModule, MdGridListModule,
    MdSnackBarModule, BrowserAnimationsModule, MdInputModule, FormsModule, MdRadioModule, MdTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
