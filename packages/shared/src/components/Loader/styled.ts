import styled from 'styled-components'

export const LoadingContainer = styled.div<{ fullScreen?: boolean }>`
  width: 100%;
  height: ${({ fullScreen }) => (fullScreen ? '100vh' : '100%')};
  display: flex;
  justify-content: center;
  align-items: center;
`
