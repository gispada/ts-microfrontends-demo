import React, { useContext, useEffect } from 'react'
import { Container, Text } from 'shared/components'
import { MenuContext } from '../context'

const NotFound = () => {
  const registerMenu = useContext(MenuContext)

  useEffect(() => {
    registerMenu(undefined) // Hide menu sidebar
  }, [])

  return (
    <Container>
      <Text h1>Page not found</Text>
    </Container>
  )
}

export default NotFound
