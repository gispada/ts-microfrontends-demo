import React, { FC, lazy, useEffect } from 'react'
import { LineChartOutlined, DatabaseOutlined } from '@ant-design/icons'
import { Routes, Route, Navigate } from 'react-router-dom'
import type { RegisterMenuFn } from 'container/context'

const Sales = lazy(() => import('./pages/Sales'))
const Products = lazy(() => import('./pages/Products'))

export const routesConfig = [
  {
    title: 'Sales',
    path: 'sales',
    icon: <LineChartOutlined />,
    element: <Sales />
  },
  {
    title: 'Products',
    path: 'products',
    icon: <DatabaseOutlined />,
    element: <Products />
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
