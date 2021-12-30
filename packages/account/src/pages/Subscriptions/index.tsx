import React from 'react'
import dayjs from 'dayjs'
import { PageHeader, Container } from 'shared/components'
import { Table } from 'shared/components/Table'
import { sortBy } from 'shared/utils'
import { columns } from './config'
import { subscriptions } from './mock'

const scroll = { x: 600 }

const Subscriptions = () => {
  const sortedSubscriptions = sortBy(subscriptions, 'timestamp', 'desc')

  const lastPaymentDate = sortedSubscriptions.find(
    ({ status }) => status === 'approved'
  )?.timestamp

  return (
    <Container maxWidth={960}>
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
        rowKey="id"
      />
    </Container>
  )
}

export default Subscriptions
