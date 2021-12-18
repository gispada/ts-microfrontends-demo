import React, { FC, lazy, useEffect } from 'react'
import { UserOutlined, WalletOutlined } from '@ant-design/icons'
import { Routes, Route, Navigate } from 'react-router-dom'
import type { RegisterMenuFn } from 'container/context'

const Profile = lazy(() => import('./pages/Profile'))
const Subscriptions = lazy(() => import('./pages/Subscriptions'))

export const routesConfig = [
  {
    title: 'Profile',
    path: 'profile',
    icon: <UserOutlined />,
    element: <Profile />
  },
  {
    title: 'Subscriptions',
    path: 'subscriptions',
    icon: <WalletOutlined />,
    element: <Subscriptions />
  }
]

type Props = {
  registerMenu?: RegisterMenuFn
}

const AccountRoutes: FC<Props> = ({ registerMenu }) => {
  useEffect(() => {
    registerMenu?.(routesConfig)
  }, [])

  return (
    <Routes>
      {routesConfig.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="*" element={<Navigate to="profile" replace />} />
    </Routes>
  )
}

export default AccountRoutes
