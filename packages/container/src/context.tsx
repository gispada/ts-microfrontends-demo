import { createContext, useCallback, useContext } from 'react'
import { useResolvedPath } from 'react-router-dom'
import type { MenuItem } from 'shared/components'

export type RegisterMenuFn = (items?: MenuItem[]) => void

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

export const MenuContext = createContext<RegisterMenuFn>(noop)
MenuContext.displayName = 'MenuContext'

export const useRegisterMenuWithBasename = () => {
  const registerMenu = useContext(MenuContext)
  const { pathname } = useResolvedPath('') // Trick to get the base path

  const registerMenuWithBasename = useCallback<RegisterMenuFn>(
    (items) => {
      const menu = items?.map(({ path, ...rest }) => ({
        path: `${pathname}/${path}`,
        ...rest
      }))
      registerMenu(menu)
    },
    [pathname]
  )

  return registerMenuWithBasename
}
