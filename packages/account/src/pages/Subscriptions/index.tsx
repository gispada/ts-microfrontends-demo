import React from 'react'
import { PageHeader } from 'shared/components'
import { Container } from '../../components/Container'

const Subscriptions = () => {
  return (
    <Container>
      <PageHeader title="Your subscriptions" subTitle="Last modified: yesterday" />
      <p>Table</p>
    </Container>
  )
}

export default Subscriptions
