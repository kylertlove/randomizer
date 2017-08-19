// src/electron/electron.js

const { app, BrowserWindow } = require('electron');
const ipc = require('electron').ipcMain;
const fs = require('fs');
const studentsFile = `${__dirname}/assets/students.json`;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({ width: 1100, height: 700 });

    // and load the index.html of the app.
    win.loadURL(`file://${__dirname}/index.html`);

    // Open the DevTools.
    //win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

//CRUD like methods for editing simple students.json file
ipc.on('getStudents', function(event, arg) {
    fs.readFile(studentsFile, function(err, data) {
        if (err) throw err;
        objTrue = JSON.parse(data);
        event.returnValue = objTrue;
    });
});

ipc.on('addStudent', function(event, arg) {
    fs.writeFile(studentsFile, arg, (err) => {
        if (err) {
            console.log(err);
            event.returnValue = "N";
        } else {
            console.log("Saved");
            event.returnValue = "Y";
        }
    });
});

ipc.on('addClass', function(event, arg) {
    fs.writeFile(studentsFile, arg, (err) => {
        if (err) {
            console.log(err);
            event.returnValue = "N";
        } else {
            console.log("Saved");
            event.returnValue = "Y";
        }
    });
});

ipc.on('getSounds', function(event, args) {
    event.returnValue = [`${__dirname}/assets/sounds/drumroll.mp3`];
})