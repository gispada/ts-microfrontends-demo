import React, { lazy, useState, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Shell, Loader, MenuItem } from 'shared/Components'
import { MenuContext } from './context'
import { topMenu } from './config'
import Logo from '../assets/webpack-logo.png'

const Profile = lazy(() => import('./pages/Profile'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

function App() {
  const [sideMenu, setSideMenu] = useState<MenuItem[]>([])

  return (
    <MenuContext.Provider value={setSideMenu}>
      <Shell logoUri={Logo} topMenu={topMenu} sideMenu={sideMenu}>
        <Suspense fallback={<Loader tip="Loading..." />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="profile/*" element={<Profile />} />
          </Routes>
        </Suspense>
      </Shell>
    </MenuContext.Provider>
  )
}

export default App
