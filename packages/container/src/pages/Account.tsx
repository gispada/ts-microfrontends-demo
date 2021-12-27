import React from 'react'
// import mount from 'account/mount'
import AccountRoutes from 'account/routes'
import { useRegisterMenuWithBasename } from '../context'

/* const Account = () => {
  const registerSideMenu = useContext(MenuContext)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return mount(ref.current!, { registerSideMenu })
  }, [])

  return <div ref={ref} />
} */

const Account = () => {
  const registerMenuWithBasename = useRegisterMenuWithBasename()

  return <AccountRoutes registerMenu={registerMenuWithBasename} />
}

export default Account
