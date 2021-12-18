import React, { useContext, useEffect } from 'react'
import { MenuContext } from '../context'

const Dashboard = () => {
  const registerMenu = useContext(MenuContext)

  useEffect(() => {
    registerMenu([])
  }, [])

  return <h1>Dashboard</h1>
}

export default Dashboard
