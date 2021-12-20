import React, { useContext, useCallback } from 'react'
import { useResolvedPath } from 'react-router-dom'
// import mount from 'account/mount'
import AccountRoutes from 'account/routes'
import { MenuContext, RegisterMenuFn } from '../context'

/* const Account = () => {
  const registerSideMenu = useContext(MenuContext)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return mount(ref.current!, { registerSideMenu })
  }, [])

  return <div ref={ref} />
} */

const Account = () => {
  const registerMenu = useContext(MenuContext)
  const { pathname } = useResolvedPath('') // Trick to get the base path

  const registerMenuWithBasename = useCallback<RegisterMenuFn>(
    (items) => {
      const menu = items.map(({ path, ...rest }) => ({
        path: `${pathname}/${path}`,
        ...rest
      }))
      registerMenu(menu)
    },
    [pathname]
  )

  return <AccountRoutes registerMenu={registerMenuWithBasename} />
}

export default Account
