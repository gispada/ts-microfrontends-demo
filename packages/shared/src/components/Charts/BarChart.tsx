import React, { FC } from 'react'
import { BarChart, CartesianGrid, Tooltip, Legend, Bar, XAxis, YAxis } from 'recharts'
import withResponsiveContainer from './withResponsiveContainer'
import { COLORS, ChartData, Formatter } from './common'

type BarConfig = {
  dataKey: string
  fillColor?: string
  stackId?: string
}

export type BarChartProps = {
  data: ChartData[]
  barsConfig: BarConfig[]
  width?: number
  height?: number
  xAxisDataKey?: string
  barGap?: string | number
  formatter?: Formatter
}

const BarChartComponent: FC<BarChartProps> = ({
  data,
  width,
  height,
  barsConfig,
  formatter,
  barGap = '25%',
  xAxisDataKey = 'name'
}) => {
  const tooltipFormatter = formatter
    ? (value: any, name: string) => [value, formatter(name)]
    : undefined

  return (
    <BarChart width={width} height={height} data={data} barCategoryGap={barGap}>
      <CartesianGrid vertical={false} />
      <XAxis dataKey={xAxisDataKey} axisLine={false} tickLine={false} />
      <YAxis axisLine={false} tickLine={false} />
      <Tooltip formatter={tooltipFormatter} />
      <Legend formatter={formatter} />
      {barsConfig.map(({ dataKey, fillColor, stackId }, i) => (
        <Bar
          key={`bar-${i}`}
          dataKey={dataKey}
          fill={fillColor || COLORS[i % COLORS.length]}
          stackId={stackId}
        />
      ))}
    </BarChart>
  )
}

export default withResponsiveContainer(React.memo(BarChartComponent))
