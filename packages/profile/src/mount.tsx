import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { sideMenu } from './config'
import type { RegisterMenuFn } from 'container/context'

type Options = {
  registerSideMenu: RegisterMenuFn
}

function mount(el: HTMLElement, { registerSideMenu }: Options) {
  registerSideMenu(sideMenu)

  ReactDOM.render(<App />, el)

  return function unmount() {
    console.log('> Unmounting profile')
    ReactDOM.unmountComponentAtNode(el)
  }
}

export default mount
