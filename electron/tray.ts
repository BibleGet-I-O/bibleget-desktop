import { Menu, Tray, nativeTheme } from 'electron'
import * as path from 'path'
import { handleContextEvent } from './events/contextMenu'
import { CONTEXT_MENU } from './events/constants'

const getIcon = ():string => {
  const lightVersion = 'icon-dark'
  const darkVersion = 'icon-light'

  return `${(nativeTheme.shouldUseDarkColors) ? lightVersion : darkVersion}.png`
}

const trayContextMenu:Electron.MenuItemConstructorOptions[] = [
  {
    id: CONTEXT_MENU.FIND,
    label: 'Find quote',
    click: handleContextEvent
  },
  {
    id: CONTEXT_MENU.ABOUT,
    label: 'About',
    click: handleContextEvent
  }
]

export const useTray = (app: Electron.App):void => {
  app.on('ready', () => {
    if (app.dock) {
      app.dock.hide()
    }

    const tray:Electron.Tray = new Tray(path.resolve(__dirname, '..', 'assets', getIcon()))
    const contextMenu = Menu.buildFromTemplate(trayContextMenu)

    tray.setContextMenu(contextMenu)
  })
}
