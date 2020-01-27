import * as path from 'path';
import { app, BrowserWindow, Menu } from 'electron';
import { enableLiveReload } from 'electron-compile';
import { DEVMODE } from '../utils/environment';

if (DEVMODE) {
  enableLiveReload();
}

// TODO: native os menus
// TODO: main proc

let win: BrowserWindow | null = null;

app.on('ready', async () => {

  Menu.setApplicationMenu(null);
  // default menu runs on OS theme which is not uniform across platforms
  win = new BrowserWindow({
    show: true,
    webPreferences: {
      nodeIntegration: true,
      // Enable experimental features that we use: ResizeObserver
      experimentalFeatures: true
    }
  });
  win.loadURL('file://' + path.join(__dirname, '..', 'pages', 'index.html'));
  win.on('close', () => win = null);

  if (process.env.DEBUG) {
    win.webContents.toggleDevTools();
  }

});
