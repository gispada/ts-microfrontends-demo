import React, { FC } from 'react'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import withResponsiveContainer from './withResponsiveContainer'
import { COLORS, ChartData } from './common'

export type PieChartProps = {
  data: ChartData[]
  width?: number
  height?: number
  dataKey?: string
}

const PieChartComponent: FC<PieChartProps> = ({ data, width, height, dataKey = 'value' }) => {
  return (
    <PieChart width={width} height={height}>
      <Pie
        data={data}
        outerRadius="60%"
        innerRadius="40%"
        dataKey={dataKey}
        label
        paddingAngle={2}
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  )
}

export default withResponsiveContainer(React.memo(PieChartComponent))
