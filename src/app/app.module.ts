import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import {NgxElectronModule} from 'ngx-electron';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { TeamsComponent } from './teams/teams.component';
import {MaterialModule } from './MaterialModule';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    TeamsComponent
  ],
  imports: [
    BrowserModule, HttpModule, NgxElectronModule, BrowserAnimationsModule, FormsModule, MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AboutComponent, TeamsComponent
  ]
})
export class AppModule { }
