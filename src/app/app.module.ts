import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MdButtonModule, MdCheckboxModule, MdToolbarModule, MdRadioModule,
   MdSnackBarModule, MdGridListModule, MdInputModule, MdTabsModule, MdCardModule,
    MdDialogModule, MdSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import {NgxElectronModule} from 'ngx-electron';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule, MdButtonModule, MdCheckboxModule, HttpModule, NgxElectronModule, MdToolbarModule, MdGridListModule,
    MdSnackBarModule, BrowserAnimationsModule, MdInputModule, FormsModule, MdRadioModule, MdTabsModule, MdCardModule, 
    MdDialogModule, MdSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AboutComponent
  ]
})
export class AppModule { }
