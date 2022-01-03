import React, { lazy, useState, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Shell, Loader, MenuItem } from 'shared/components'
import Logo from '../assets/webpack-logo.png'
import { MenuContext } from './context'
import { topMenu } from './config'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const Account = lazy(() => import('./pages/Account'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

function App() {
  const [sideMenu, setSideMenu] = useState<MenuItem[] | undefined>([])

  return (
    <MenuContext.Provider value={setSideMenu}>
      <Shell logoUri={Logo} topMenu={topMenu} sideMenu={sideMenu}>
        <Suspense fallback={<Loader tip="Loading..." />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="dashboard/*" element={<Dashboard />} />
            <Route path="account/*" element={<Account />} />
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="404" replace />} />
          </Routes>
        </Suspense>
      </Shell>
    </MenuContext.Provider>
  )
}

export default App
