import { ChartType } from 'shared/components/Charts'
import { regionsData, salesData, trendsData } from './mock'
import { DashboardConfig } from './types'

const formattedStringsMap: Record<string, string> = {
  salesOnline: 'Online sales ($)',
  salesRetail: 'Retail sales ($)',
  refundsPercentage: 'Refunds (%)',
  itemsOnDiscountPercentage: 'Items on discount (%)'
}

const formatter = (value: string) => formattedStringsMap[value]

export const dashboardConfig: DashboardConfig = [
  {
    id: 'row-1',
    items: [
      {
        type: ChartType.BarChart,
        title: 'Annual sales',
        props: {
          data: salesData,
          formatter,
          barsConfig: [
            {
              dataKey: 'salesOnline',
              stackId: 'stack_1'
            },
            {
              dataKey: 'salesRetail',
              stackId: 'stack_1'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'row-2',
    items: [
      {
        type: ChartType.PieChart,
        title: 'Sales by region',
        props: { data: regionsData }
      },
      {
        type: ChartType.LineChart,
        title: 'Sales and refunds trend',
        props: {
          data: trendsData,
          formatter,
          linesConfig: [
            { dataKey: 'refundsPercentage' },
            { dataKey: 'itemsOnDiscountPercentage' }
          ]
        }
      }
    ]
  }
]
