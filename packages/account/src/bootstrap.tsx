import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Loader } from 'shared/components'
import App from './App'

const root = createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <Suspense fallback={<Loader fullScreen tip="Loading..." />}>
      <App />
    </Suspense>
  </React.StrictMode>
)
