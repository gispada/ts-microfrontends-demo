import React, { FC } from 'react'
import { Tag } from 'shared/components'
import type { SubscriptionStatus } from './types'

type Props = {
  value: SubscriptionStatus
}

const colors: Record<SubscriptionStatus, string> = {
  approved: 'green',
  pending: 'geekblue',
  rejected: 'volcano'
}

const Status: FC<Props> = ({ value }) => (
  <Tag color={colors[value]} key={value}>
    {value.toUpperCase()}
  </Tag>
)

export default Status
