import React, { FC } from 'react'
import { StyledContainer } from './styled'

type Props = {
  maxWidth?: number
}

const Container: FC<Props> = ({ children, maxWidth = 1200 }) => (
  <StyledContainer $maxWidth={maxWidth}>{children}</StyledContainer>
)

export default Container
