import { app } from 'electron'

import { initialize as initializeWindow } from './windows/core'
import { useTray } from './tray'

app.on('ready', () => {
  initializeWindow()
})
useTray(app)

app.allowRendererProcessReuse = true
