import { Component, OnInit } from '@angular/core';
import {ElectronService} from 'ngx-electron';
import { MdSnackBar, MdDialog } from '@angular/material';
import { AboutComponent } from "./about/about.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  title = 'Student Randomizer';
  selectedClass;
  classes;
  newName;
  newClass;
  audio = [];
  toggleView = 0;
  selectedRandomNum;
  groupAmount = [1, 2, 3, 4];
  constructor(private electronService:ElectronService, public snackBar: MdSnackBar, public dialog: MdDialog){}

  ngOnInit() {
    this.getStudents();
    this.audio = this.electronService.ipcRenderer.sendSync('getSounds', 'ping');
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

  drumRoll = () => {
    let audio = new Audio();
    audio.src = this.audio[0];
    audio.load();
    audio.play();
  }

  needHelp = () => {
    this.dialog.open(AboutComponent, {
      height: '400px',
      width: '600px',
    });
  }
  randomView = () => {
    this.toggleView = 2;
  }

  editData = () => {
    this.toggleView = 1;
  }
  saveEdits = (index, changedName) => {
    if(this.electronService.isElectronApp){
      let pong:string = this.electronService.ipcRenderer.sendSync('addStudent', JSON.stringify(this.classes));
      if(pong == 'Y'){
        this.openSnackBar("Saved Students!");
      }
    }
    this.toggleView = 0;
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  shuffle() {
    let array = [];
    array = this.selectedClass[1];
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  randomizeData = () => {
    switch(this.selectedRandomNum){
      case(1):
        let newArr = this.shuffle();
        console.log(newArr);
      break;
      case(2):
      console.log("2");
      break;
      case(3):
      console.log("3");
      break;
      case(4):
      console.log("4");
      break;
    }
  }

}

