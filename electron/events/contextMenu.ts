import { MenuItem } from 'electron'
import { CONTEXT_MENU } from './constants'
import { windowQuery } from '../windows'

export const handleContextEvent = (item:MenuItem):void => {
  switch (item.id) {
    case CONTEXT_MENU.FIND:
      windowQuery().open()
      break
    default:
      break
  }
}
