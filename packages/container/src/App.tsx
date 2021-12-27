import React, { lazy, useState, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Shell, Loader, MenuItem } from 'shared/components'

import { MenuContext } from './context'
import { topMenu } from './config'
import Logo from '../assets/webpack-logo.png'

const Account = lazy(() => import('./pages/Account'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

function App() {
  const [sideMenu, setSideMenu] = useState<MenuItem[]>([])

  return (
    <MenuContext.Provider value={setSideMenu}>
      <Shell logoUri={Logo} topMenu={topMenu} sideMenu={sideMenu}>
        <Suspense fallback={<Loader tip="Loading..." />}>
          <Routes>
            <Route path="dashboard/*" element={<Dashboard />} />
            <Route path="account/*" element={<Account />} />
          </Routes>
        </Suspense>
      </Shell>
    </MenuContext.Provider>
  )
}

export default App
