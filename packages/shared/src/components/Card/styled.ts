import styled from 'styled-components'
import { Card } from 'antd'

export const StyledCard = styled(Card)<{ $height?: number }>`
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  height: ${({ $height }) => ($height ? `${$height}px` : '100%')};
`
