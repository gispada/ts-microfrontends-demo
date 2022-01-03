import React, { FC } from 'react'
import { StyledContainer } from './styled'

type Props = {
  maxWidth?: number
  noHorizontalScroll?: boolean // Workaround for https://github.com/ant-design/ant-design/issues/10144
}

const Container: FC<Props> = ({ children, noHorizontalScroll = false, maxWidth = 1200 }) => (
  <StyledContainer $maxWidth={maxWidth} $noOverflowX={noHorizontalScroll}>
    {children}
  </StyledContainer>
)

export default Container
