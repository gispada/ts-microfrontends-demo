import React, { FC } from 'react'
import { StyledButton } from './styled'

type Props = {
  onClick?: () => void
}

const Button: FC<Props> = ({ children, onClick }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>
}

export default Button
