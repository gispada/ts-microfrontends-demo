import styled from 'styled-components'

export const StyledContainer = styled.div<{ $maxWidth: number; $noOverflowX: boolean }>`
  max-width: ${({ $maxWidth }) => $maxWidth}px;
  margin: 0 auto;
  ${({ $noOverflowX }) => $noOverflowX && 'overflow-x: hidden;'}
`
