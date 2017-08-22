import { Component, OnInit } from '@angular/core';
import {ElectronService} from 'ngx-electron';
import { MdSnackBar, MdDialog } from '@angular/material';
import { AboutComponent } from "./about/about.component";
import { TeamsComponent } from "./teams/teams.component";

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
  presentArray = [];
  skipDrumRoll;
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

  removeClass = () => {
    for (let i = 0; i < this.classes.length; i++) {
      if (this.selectedClass[0] == this.classes[i][0]) {
        this.classes.splice(i, 1);
        let pong: string = this.electronService.ipcRenderer.sendSync('addStudent', JSON.stringify(this.classes));
        if (pong == 'Y') {
          this.openSnackBar("Class Removed!");
        }
        this.toggleView = 0;
        if (this.classes.length > 0) {
          this.selectedClass = this.classes[0];
        } else {
          this.selectedClass = null;
        }
      }
    }
  }

  removeStudent = (index) => {
    this.selectedClass[1].splice(index, 1);
    let pong:string = this.electronService.ipcRenderer.sendSync('addStudent', JSON.stringify(this.classes));
    if(pong == 'Y'){
      this.openSnackBar("Student Removed!");
    }
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
    if(this.toggleView != 1){
      this.toggleView = 1;
    }else{
      this.toggleView = 0;
    }
    
  }
  saveEdits = (index, changedName) => {
    if(this.electronService.isElectronApp){
      let pong:string = this.electronService.ipcRenderer.sendSync('addStudent', JSON.stringify(this.classes));
      if(pong == 'Y'){
        this.openSnackBar("Saved Students!");
      }
    }
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  shuffle(selected) {
    let array = [];
    array = selected.slice();
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  randomizeData = () => {
    this.presentArray = [];
    switch(this.selectedRandomNum){
      case(1):
        let newArr = this.shuffle(this.selectedClass[1]);
        if(this.skipDrumRoll){
          this.presentArray = newArr;
        }else{
          this.drumRoll();
          setTimeout(() => {
            this.presentArray = newArr;
          }, 2300);
        }
      break;
      case(2):
      let newArr2 = this.shuffle(this.selectedClass[1]); 
      newArr2 = this.getNextGroup(newArr2, 2);
        if(this.skipDrumRoll){
          this.presentArray = newArr2;
        }else{
          this.drumRoll();
          setTimeout(() => {
            this.presentArray = newArr2;
          }, 2300);
        }
      break;
      case(3):
      let newArr3 = this.shuffle(this.selectedClass[1]);
      newArr3 = this.getNextGroup(newArr3, 3);
      if(this.skipDrumRoll){
        this.presentArray = newArr3;
      }else{
        this.drumRoll();
        setTimeout(() => {
          this.presentArray = newArr3;
        }, 2300);
      }
      break;
      case(4):
      let newArr4 = this.shuffle(this.selectedClass[1]);
      newArr4 = this.getNextGroup(newArr4, 4);
      if(this.skipDrumRoll){
        this.presentArray = newArr4;
      }else{
        this.drumRoll();
        setTimeout(() => {
          this.presentArray = newArr4;
        }, 2300);
      }
      break;
    }
  }

  getNextGroup = (arr, num) => {
    let groupedArr = [];
    let combinedNames = "";
    let foundNum = 1;

    for(let i = 0; i < arr.length; i++){
      if(combinedNames == ""){
        combinedNames += arr[i];
      }else{
        combinedNames += " & " + arr[i];
      }
      if(foundNum == num){
        groupedArr.push(combinedNames);
        combinedNames = "";
        foundNum = 0;
      }else if(i == arr.length - 1){
        groupedArr.push(combinedNames);
      }
      foundNum++;
    }
    return groupedArr;
  }
}

