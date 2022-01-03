import React from 'react'
import { Card, Row, Col, PageHeader, Container, Text } from 'shared/components'
import { BarChart, PieChart, LineChart, ChartType as C } from 'shared/components/Charts'
import { match } from 'shared/utils'
import { dashboardConfig } from './config'
import { ChartItem } from './types'

const H = 512

const Sales = () => {
  const renderChart = (item: ChartItem) =>
    match(item)
      .when({ type: C.BarChart }, ({ props }) => <BarChart {...props} height={H} />)
      .when({ type: C.LineChart }, ({ props }) => <LineChart {...props} height={H} />)
      .when({ type: C.PieChart }, ({ props }) => <PieChart {...props} height={H} />)
      .otherwise(() => <Text>Could not render chart</Text>)

  return (
    <Container maxWidth={1200} noHorizontalScroll>
      <PageHeader title="Sales overview" subTitle="Latest year trends" />
      {dashboardConfig.map(({ id, items }) => (
        <Row $margins={{ bottom: 24 }} key={id} gutter={[24, 24]}>
          {items.map((item, i) => (
            <Col key={`${id}-${i}`} xs={24} md={24 / items.length}>
              <Card title={item.title}>{renderChart(item)}</Card>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  )
}

export default Sales
