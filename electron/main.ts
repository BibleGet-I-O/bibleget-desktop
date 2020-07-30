import { app } from 'electron'

import { useTray } from './tray'

useTray(app)
app.allowRendererProcessReuse = true
