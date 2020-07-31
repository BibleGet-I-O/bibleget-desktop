import { BrowserWindow } from 'electron'

export interface IWindowController {
  window:BrowserWindow | null;
  open():void;
}

export const configWindow:Electron.BrowserWindowConstructorOptions = {
  title: 'Meu app',
  width: 450,
  height: 300,
  backgroundColor: '#191622',
  webPreferences: {
    nodeIntegration: true
  }
}
