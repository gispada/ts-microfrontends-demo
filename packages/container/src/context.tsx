import { createContext } from 'react'
import type { MenuItem } from 'shared/components'

export type RegisterMenuFn = (items: MenuItem[]) => void

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

export const MenuContext = createContext<RegisterMenuFn>(noop)
MenuContext.displayName = 'MenuContext'
