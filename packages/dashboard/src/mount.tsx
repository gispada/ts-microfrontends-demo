import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { routesConfig } from './routes'
import type { RegisterMenuFn } from 'container/context'

type Options = {
  registerSideMenu: RegisterMenuFn
}

function mount(el: HTMLElement, { registerSideMenu }: Options) {
  registerSideMenu(routesConfig)

  const root = createRoot(el)
  root.render(<App />)

  return function unmount() {
    root.unmount()
  }
}

export default mount
