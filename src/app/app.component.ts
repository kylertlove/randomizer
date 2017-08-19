import { Component, OnInit } from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  title = 'Student Randomizer';
  selectedClass:string[];
  classes;
  newName;
  newClass;
  constructor(private electronService:ElectronService, public snackBar: MdSnackBar){}

  ngOnInit() {
    this.getStudents();
  }

  getStudents = () => {
    if(this.electronService.isElectronApp){
      let pong = this.electronService.ipcRenderer.sendSync('getStudents', 'ping');
      this.classes = pong;
      if(this.classes.length > 0){
        this.selectedClass = this.classes[0];
      }
    }
  }

  addStudent = () => {
    if(!this.selectedClass){
      this.openSnackBar("You must select a class");
    }else if(!this.newName || this.newName == '' ){
      this.openSnackBar("You must enter a student's name");
    }else if(this.electronService.isElectronApp){
      let current = this.selectedClass[0];
      this.classes.forEach( (arr) => {
        if(arr[0] == current){
          if(this.newName.indexOf(",") != -1){
            let nameArr = this.newName.split(",");
            nameArr.forEach( item => {
              arr[1].push(item.trim());
            })
          }else{
            arr[1].push(this.newName);
          }
        }
      });
      let pong:string = this.electronService.ipcRenderer.sendSync('addStudent', JSON.stringify(this.classes));
      if(pong == 'Y'){
        this.openSnackBar("Student Added!");
        this.newName = '';
      }
    }
  }

  addClass = () => {
    if(!this.newClass || this.newClass == ''){
      this.openSnackBar("Enter a class name");
    }else{
      let newArr = [];
      newArr.push(this.newClass);
      let studentArr = [];
      newArr.push(studentArr);
      this.classes.push(newArr);
      let pong:string = this.electronService.ipcRenderer.sendSync('addClass', JSON.stringify(this.classes));
      if(pong == 'Y'){
        this.openSnackBar("Class Added!");
        this.newClass = '';
      }
    }
  }

  removeClass = (classs) => {
    console.log(classs);
  }

  openSnackBar = (line) => {
    this.snackBar.open(line, "OK", {
      duration: 3000
    });
  }
}

