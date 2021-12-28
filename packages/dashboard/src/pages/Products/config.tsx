import React from 'react'
import { TableColumnType } from 'antd'
import { TableCellLink } from 'shared/components/Table'
import type { Product } from '../../api/types'

export const columns: TableColumnType<Product>[] = [
  {
    title: 'Product',
    dataIndex: 'title',
    render: (_, record) => <TableCellLink value={record.title} link={record.id.toString()} />
  },
  {
    title: 'Category',
    dataIndex: 'category'
  },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price,
    align: 'right',
    defaultSortOrder: 'descend',
    render: (value: Product['price']) => `$${value.toFixed(2)}`
  }
]
