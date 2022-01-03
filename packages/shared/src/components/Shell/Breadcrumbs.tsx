import React, { FC } from 'react'
import { Breadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { capitalize } from '../../utils'

type Props = {
  pathname: string
}

const Breadcrumbs: FC<Props> = ({ pathname }) => (
  <Breadcrumb className="breadcrumbs">
    <Breadcrumb.Item>
      <HomeOutlined />
    </Breadcrumb.Item>
    {pathname
      .split('/')
      .filter(Boolean)
      .map((key) => (
        <Breadcrumb.Item key={key}>{capitalize(key)}</Breadcrumb.Item>
      ))}
  </Breadcrumb>
)

export default React.memo(Breadcrumbs)
