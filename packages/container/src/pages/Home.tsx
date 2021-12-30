import React, { useContext, useEffect } from 'react'
import { Container, Text } from 'shared/components'
import { MenuContext } from '../context'

const Home = () => {
  const registerMenu = useContext(MenuContext)

  useEffect(() => {
    registerMenu([])
  }, [])

  return (
    <Container>
      <Text h1>TypeScript Microfrontends</Text>
      <Text>There are five projects making up this application.</Text>
      <Text h5>Container</Text>
      <Text>
        The shell with the header and the side panel. Handles the top level routing.
      </Text>
      <Text h5>Account</Text>
      <Text>React application showing a basic account section. Has two subroutes.</Text>
      <Text h5>Dashboard</Text>
      <Text>
        React application with random data displayed in charts and a table. Has three
        subroutes, one of which consumes another frontend.
      </Text>
      <Text h5>Product</Text>
      <Text>
        Vue 3 application showing details on the items listed in the Dashboard table.
      </Text>
      <Text h5>Shared</Text>
      <Text>
        Shared components and utils. It exposes both React and Vue components, consumed by the
        previous frontends.
      </Text>
    </Container>
  )
}

export default Home
