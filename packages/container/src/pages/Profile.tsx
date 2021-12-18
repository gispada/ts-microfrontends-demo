import React, { useRef, useEffect, useContext } from 'react'
import mount from 'profile/mount'
import { MenuContext } from '../context'

const Profile = () => {
  const registerSideMenu = useContext(MenuContext)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return mount(ref.current!, { registerSideMenu })
  }, [])

  return <div ref={ref} />
}

export default Profile
