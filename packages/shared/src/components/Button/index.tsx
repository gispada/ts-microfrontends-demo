import React, { FC } from 'react'
import { Button as AntdButton, ButtonProps } from 'antd'

type Props = ButtonProps

const Button: FC<Props> = ({ children, ...rest }) => {
  return <AntdButton {...rest}>{children}</AntdButton>
}

export default Button
