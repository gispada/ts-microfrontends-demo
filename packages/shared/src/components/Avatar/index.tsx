import React, { FC, ReactNode } from 'react'
import { Avatar as AntdAvatar } from 'antd'

type Props = {
  name: string
  size?: number
  shape?: 'circle' | 'square'
  icon?: ReactNode
  src?: string
}

const getInitials = (name: string) => {
  const [first, second] = name.split(' ')
  return second ? `${first[0]}${second[0]}` : first[0]
}

const Avatar: FC<Props> = ({ name, icon, shape, size, src }) => (
  <AntdAvatar src={src} icon={icon} shape={shape} size={size}>
    {getInitials(name)}
  </AntdAvatar>
)

export default Avatar
