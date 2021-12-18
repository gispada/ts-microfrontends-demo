import React, { FC } from 'react'
import { Spin } from 'antd'
import { LoadingContainer } from './styled'

type Props = {
  tip?: string
  size?: 'small' | 'large' | 'default'
  fullScreen?: boolean
}

const Loader: FC<Props> = ({ fullScreen, tip, size = 'large' }) => {
  return (
    <LoadingContainer fullScreen={fullScreen}>
      <Spin size={size} tip={tip} />
    </LoadingContainer>
  )
}

export default Loader
