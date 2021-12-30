import React, { useState, useEffect } from 'react'
import { PageHeader, Container } from 'shared/components'
import { Table } from 'shared/components/Table'
import { getProducts } from '../../api'
import { columns } from './config'
import type { Product } from '../../api/types'

const scroll = { x: 600 }

const Products = () => {
  const [data, setData] = useState<Product[]>()

  useEffect(() => {
    getProducts().then(setData)
  }, [])

  return (
    <Container maxWidth={1200}>
      <PageHeader title="Products on sale" />
      <Table
        loading={data === undefined}
        columns={columns}
        dataSource={data}
        scroll={scroll}
        rowKey="id"
      />
    </Container>
  )
}

export default Products
