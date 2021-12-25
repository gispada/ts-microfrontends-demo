import React, { FC, lazy, useEffect } from 'react'
import { DollarOutlined } from '@ant-design/icons'
import { Routes, Route, Navigate } from 'react-router-dom'
import type { RegisterMenuFn } from 'container/context'

const Sales = lazy(() => import('./pages/Sales'))

export const routesConfig = [
  {
    title: 'Sales',
    path: 'sales',
    icon: <DollarOutlined />,
    element: <Sales />
  }
]

type Props = {
  registerMenu?: RegisterMenuFn
}

const DashboardRoutes: FC<Props> = ({ registerMenu }) => {
  useEffect(() => {
    registerMenu?.(routesConfig)
  }, [])

  return (
    <Routes>
      {routesConfig.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="*" element={<Navigate to="sales" replace />} />
    </Routes>
  )
}

export default DashboardRoutes
