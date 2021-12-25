import { ChartType, BarChartProps, LineChartProps, PieChartProps } from 'shared/components'

type BaseItem = {
  title: string
}

export type BarChartItem = BaseItem & {
  type: ChartType.BarChart
  props: BarChartProps
}

export type LineChartItem = BaseItem & {
  type: ChartType.LineChart
  props: LineChartProps
}

export type PieChartItem = BaseItem & {
  type: ChartType.PieChart
  props: PieChartProps
}

export type ChartItem = BarChartItem | LineChartItem | PieChartItem

export type DashboardConfig = {
  id: string
  items: ChartItem[]
}[]
