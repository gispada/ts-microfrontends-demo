import React, { useContext, useEffect } from 'react'
import { MenuContext } from '../context'

const Dashboard = () => {
  const registerSideMenu = useContext(MenuContext)

  useEffect(() => {
    registerSideMenu([])
  }, [])

  return <h1>Dashboard</h1>
}

export default Dashboard
