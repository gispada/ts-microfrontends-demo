import React, { useEffect, useRef } from 'react'
// import { mount } from 'child1/App'

function App() {
  const childRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    /* const unmount = mount(childRef.current)
    return unmount */
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Container Application</h1>
      </header>
      <div ref={childRef} />
    </div>
  )
}

export default App
