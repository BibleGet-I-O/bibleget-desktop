import { MenuItem } from 'electron'
import { CONTEXT_MENU } from './constants'
import { getWindow } from '../windows/core'

export const handleContextEvent = (item:MenuItem):void => {
  switch (item.id) {
    case CONTEXT_MENU.FIND:
      getWindow().open()
      break
    default:
      break
  }
}
