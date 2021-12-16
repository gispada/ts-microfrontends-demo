import React, { FC } from 'react'
import { StyledCard } from './styled'

type Props = {
  title?: string
}

const Card: FC<Props> = ({ children, title }) => {
  return (
    <StyledCard>
      {title && <h1>{title}</h1>}
      <div>{children}</div>
    </StyledCard>
  )
}

export default Card
