import React, { FC } from 'react'
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'
import withResponsiveContainer from './withResponsiveContainer'
import { COLORS, ChartData, Formatter } from './common'

type LineConfig = {
  dataKey: string
  strokeColor?: string
}

export type LineChartProps = {
  data: ChartData[]
  linesConfig: LineConfig[]
  width?: number
  height?: number
  xAxisDataKey?: string
  formatter?: Formatter
}

const LineChartComponent: FC<LineChartProps> = ({
  data,
  width,
  height,
  formatter,
  linesConfig,
  xAxisDataKey = 'name'
}) => {
  const tooltipFormatter = formatter
    ? (value: any, name: string) => [value, formatter(name)]
    : undefined

  return (
    <LineChart width={width} height={height} data={data}>
      <CartesianGrid vertical={false} />
      <XAxis dataKey={xAxisDataKey} axisLine={false} tickLine={false} />
      <YAxis axisLine={false} tickLine={false} />
      <YAxis />
      <Tooltip formatter={tooltipFormatter} />
      <Legend formatter={formatter} />
      {linesConfig.map(({ dataKey, strokeColor }, i) => (
        <Line
          key={`line-${i}`}
          type="monotone"
          dataKey={dataKey}
          stroke={strokeColor || COLORS[i % COLORS.length]}
        />
      ))}
    </LineChart>
  )
}

export default withResponsiveContainer(React.memo(LineChartComponent))
