import { BrowserWindow, Tray, Menu } from 'electron'
import * as path from 'path'
import * as url from 'url'
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer'

let mainWindow: Electron.BrowserWindow | null

export interface IWindowController {
  window:Electron.BrowserWindow;
  open():void;
}

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: true
    }
  })

  // TODO: refactor these lines below, to use IWindowController
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:4000')
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

export const useWindow = (app: Electron.App):void => {
  app.on('ready', createWindow)
    .whenReady()
    .then(() => {
      if (process.env.NODE_ENV === 'development') {
        installExtension(REACT_DEVELOPER_TOOLS)
          .then((name) => console.log(`Added Extension:  ${name}`))
          .catch((err) => console.log('An error occurred: ', err))
        installExtension(REDUX_DEVTOOLS)
          .then((name) => console.log(`Added Extension:  ${name}`))
          .catch((err) => console.log('An error occurred: ', err))
      }
    })
}

export const windowQuery = ():IWindowController => {
  let window:BrowserWindow|null = new BrowserWindow({
    width: 250,
    height: 500,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: true
    }
  })

  const open = () => {
    if (window === null) return

    if (process.env.NODE_ENV === 'development') {
      window.loadURL('http://localhost:4000')
    } else {
      window.loadURL(
        url.format({
          pathname: path.join(__dirname, 'renderer/index.html'),
          protocol: 'file:',
          slashes: true
        })
      )
    }

    window.on('closed', function () {
      window = null
    })
  }

  return {
    window,
    open
  }
}
