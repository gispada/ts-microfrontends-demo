import React from 'react'
import { PageHeader, Table } from 'shared/components'
import { sortBy, dayjs } from 'shared/utils'
import { Container } from '../../components/Container'
import { columns } from './config'
import { subscriptions } from './mock'

const scroll = { x: 600 }

const Subscriptions = () => {
  const sortedSubscriptions = sortBy(subscriptions, 'timestamp', 'desc')

  const lastPaymentDate = sortedSubscriptions.find(
    ({ status }) => status === 'approved'
  )?.timestamp

  return (
    <Container>
      <PageHeader
        title="Your subscriptions"
        subTitle={`Last payment: ${
          lastPaymentDate ? dayjs(lastPaymentDate).format('DD/MM/YYYY') : 'none'
        }`}
      />
      <Table
        columns={columns}
        dataSource={sortedSubscriptions}
        pagination={false}
        scroll={scroll}
      />
    </Container>
  )
}

export default Subscriptions
