import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Loader } from 'shared/components'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Loader fullScreen tip="Loading..." />}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
)
