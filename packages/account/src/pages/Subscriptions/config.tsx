import React from 'react'
import { TableColumnType } from 'antd'
import { dayjs } from 'shared/utils'
import Status from './Status'
import type { Subscription } from './types'

export const columns: TableColumnType<Subscription>[] = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: 'Description',
    dataIndex: 'description'
  },
  {
    title: 'Date',
    dataIndex: 'timestamp',
    render: (value: Subscription['timestamp']) => dayjs(value).format('DD/MM/YYYY')
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    align: 'right',
    render: (value: Subscription['amount']) => `$${value.toFixed(2)}`
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (value: Subscription['status']) => <Status value={value} />
  }
]
