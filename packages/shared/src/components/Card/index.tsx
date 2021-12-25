import React, { FC } from 'react'
import { StyledCard } from './styled'
import type { CardProps } from 'antd'

type Props = {
  height?: number
} & CardProps

const Card: FC<Props> = ({ children, height, ...props }) => {
  return (
    <StyledCard {...props} cardHeight={height}>
      {children}
    </StyledCard>
  )
}

export default Card
