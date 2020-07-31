import { app, BrowserWindow, Event } from 'electron'
import * as path from 'path'
import * as url from 'url'
import { IWindowController, configWindow } from './config'

let window: BrowserWindow | null

const renderWindow = (win:BrowserWindow) => {
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:4000')
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }

  win.hide()
  win.on('close', (event:Event) => {
    event.preventDefault()
    if (win) {
      win.hide()
    }
  })
}

export const initialize = ():void => {
  window = new BrowserWindow(configWindow)
  renderWindow(window)
}

export const getWindow = ():IWindowController => ({
  window: window || null,
  open: () => {
    if (window === null) return
    window.show()
  }
})
