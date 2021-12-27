import React from 'react'
import DashboardRoutes from 'dashboard/routes'
import { useRegisterMenuWithBasename } from '../context'

const Dashboard = () => {
  const registerMenuWithBasename = useRegisterMenuWithBasename()

  return <DashboardRoutes registerMenu={registerMenuWithBasename} />
}

export default Dashboard
