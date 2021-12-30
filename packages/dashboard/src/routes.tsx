import React, { FC, lazy, useEffect } from 'react'
import { LineChartOutlined, DatabaseOutlined } from '@ant-design/icons'
import { Routes, Route, Navigate } from 'react-router-dom'
import { take } from 'shared/utils'
import type { RegisterMenuFn } from 'container/context'

const Sales = lazy(() => import('./pages/Sales'))
const Products = lazy(() => import('./pages/Products'))
const Product = lazy(() => import('./pages/Product'))

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
  },
  {
    title: 'Product',
    path: 'products/:id',
    element: <Product />
  }
]

const menuItems = take(routesConfig, 2)

type Props = {
  registerMenu?: RegisterMenuFn
}

const DashboardRoutes: FC<Props> = ({ registerMenu }) => {
  useEffect(() => {
    registerMenu?.(menuItems)
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
