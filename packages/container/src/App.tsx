import React, { useEffect, useRef, useState } from 'react'
import { Button, Card } from 'shared/Components'
// import { mount } from 'child1/App'

function App() {
  const [clicked, setClicked] = useState(0)
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
      <Button onClick={() => setClicked(clicked + 1)}>Click me ({clicked})</Button>
      <Card title="Hello">
        <p>Lorem ipsum</p>
      </Card>
      <div ref={childRef} />
    </div>
  )
}

export default App
