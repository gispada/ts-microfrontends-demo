import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { routesConfig } from './routes'
import type { RegisterMenuFn } from 'container/context'

type Options = {
  registerSideMenu: RegisterMenuFn
}

function mount(el: HTMLElement, { registerSideMenu }: Options) {
  registerSideMenu(routesConfig)

  ReactDOM.render(<App />, el)

  return function unmount() {
    ReactDOM.unmountComponentAtNode(el)
  }
}

export default mount
