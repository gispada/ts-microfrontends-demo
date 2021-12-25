import React, { JSXElementConstructor } from 'react'
import { ResponsiveContainer } from 'recharts'

type Props = { height: number } | { width: number }

function withResponsiveContainer<T>(WrappedComponent: JSXElementConstructor<T>) {
  return function ResponsiveChartComponent(props: T & Props) {
    const height = 'height' in props ? props.height : '100%'
    const width = 'width' in props ? props.width : '100%'

    return (
      <ResponsiveContainer width={width} height={height}>
        <WrappedComponent {...props} />
      </ResponsiveContainer>
    )
  }
}

export default withResponsiveContainer
