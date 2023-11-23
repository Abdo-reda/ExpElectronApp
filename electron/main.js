const { app, BrowserWindow, dialog, ipcMain, autoUpdater } = require('electron');
const path = require('path');
const log = require("electron-log");
const https = require('https');
const fs = require('node:fs');

// const {autoUpdater} = require("electron-updater");

// const appName = app.isPackaged ? 'Basic App' : 'Basic App Dev';
// const userDataPath = path.join(app.getPath('appData'), appName) 
// // app.setName( appName );
// if(!fs.existsSync(userDataPath)) {
//   fs.mkdirSync(userDataPath);
// }
// app.setPath('userData', userDataPath);

// forceSingleInstance();
// let releaseServer = 'https://106a-156-204-255-77.ngrok-free.app/api';


const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('src/index.html');

  mainWindow.webContents.openDevTools();

  // ipcMain.handle('changeLink', (event, link) => {
  //   log.info('--main', link);
  //   releaseServer = link;
  //   setUpdateURL();
  // });

  // setUpForgeAutoUpdate();
  // setUpBuilderAutoUpdate();
};

app.on('ready', createWindow);


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


function forceSingleInstance() {
  if (require('electron-squirrel-startup')) app.exit();

  const gotTheLock = app.requestSingleInstanceLock();
  if (!gotTheLock) app.exit();
}


function setUpBuilderAutoUpdate() {
  autoUpdater.logger = log;
  autoUpdater.logger.transports.file.level = 'info';
  log.info('App update starting...');

  // const checkUpdateFreq = 30000;
  // let checkUpdateInterval = setInterval(() => {
  //   log.info('----- Checking for Updates');
  //   autoUpdater.checkForUpdates();
  // }, checkUpdateFreq);

  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on('checking-for-update', () => {
    log.info('Checking for update...');
  })
  autoUpdater.on('update-available', (ev, info) => {
    // clearInterval(checkUpdateInterval);
    log.info('Update available.', ev, info);
  })
  autoUpdater.on('update-not-available', (ev, info) => {
    log.info('Update not available.');
  })
  autoUpdater.on('error', (ev, err) => {
    log.info('Error in auto-updater.');
  })
  autoUpdater.on('download-progress', (ev, progressObj) => {
    log.info('Download progress...', ev, progressObj);
  })
  autoUpdater.on('update-downloaded', (ev, info) => {
    log.info('Update downloaded; will install in 5 seconds', ev, info);
  });

  autoUpdater.on('update-downloaded', (ev, info) => {
    handleUpdate(info, ev);
  })
}

function setUpdateURL() {
  const updateURL = `${releaseServer}/update/${process.platform}/${app.getVersion()}`;
  autoUpdater.setFeedURL({
    url: updateURL
  }); 
}

function setUpForgeAutoUpdate() {

  // if (ENV === 'development') return;

  // const releaseServer = 'http://127.0.0.1:5215/api'; 
  ///update/:platform/:version[/:channel]
  ///update/flavor/:flavor/:platform/:version[/:channel] //if we are using falvors, like lite versions and maya version and so on ... pretty freaking cool
  setUpdateURL();

  const checkUpdateFreq = 30000;
  let checkUpdateInterval = setInterval(() => {
    log.info('Checking for Updates');
    autoUpdater.checkForUpdates();
  }, checkUpdateFreq);

  autoUpdater.on('error', (err) => {
    log.info('Auto Update Error', err);
  });

  autoUpdater.on('update-available', () => {
    log.info('An Update is Available, Downloading ...');
    clearInterval(checkUpdateInterval);
    checkUpdateInterval = null;
  });

  autoUpdater.on('update-not-available', () => {
    log.info('update-not-available ...');
  });

  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    log.info(releaseName, event, releaseNotes)
    getReleaseNotes(releaseName);
    handleUpdate(releaseNotes, releaseName)
  });

  // autoUpdater.on('before-quit-for-update', () => {
  //   log.info('before-quit-for-update ...');
  // });
}


function handleUpdate(releaseNotes, releaseName) {
  log.info('Update Downloaded Successfully!');

  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: releaseName,
    detail:
      'A new version has been downloaded. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
}


function getReleaseNotes(releaseName) {

  // const options = {
  //   hostname: '106a-156-204-255-77.ngrok-free.app',
  //   path: `api/release/notes/${releaseName}`,
  //   method: 'GET',
  // };

  const req = https.request('https://106a-156-204-255-77.ngrok-free.app/api/release/notes', (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      log.info('Response:', data);
    });
  });

  req.on('error', (err) => {
    console.log('error', err)
  })

  req.end();


}