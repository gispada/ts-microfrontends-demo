import styled from 'styled-components'
import { Card } from 'antd'

export const StyledCard = styled(Card)<{ $height?: number }>`
  box-shadow: 0px 8px 24px rgba(149, 157, 165, 0.1);
  border-radius: 8px;
  height: ${({ $height }) => ($height ? `${$height}px` : '100%')};

  @media (max-width: 479px) {
    .ant-card-body {
      padding: 24px 12px;
    }
  }
`
