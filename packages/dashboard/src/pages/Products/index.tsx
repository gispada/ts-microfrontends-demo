import React, { useState, useEffect } from 'react'
import { PageHeader, Table } from 'shared/components'
import { Container } from '../../components/Container'
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
    <Container>
      <PageHeader title="Products on sale" />
      <Table
        loading={data === undefined}
        columns={columns}
        dataSource={data}
        scroll={scroll}
      />
    </Container>
  )
}

export default Products
