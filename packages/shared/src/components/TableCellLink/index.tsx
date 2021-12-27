import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { RightOutlined } from '@ant-design/icons'
import { StyledCell } from './styled'

type Props = {
  value: string
  link: string
}

const TableCellLink: FC<Props> = ({ value, link }) => (
  <StyledCell>
    <Link to={link}>
      <span>{value}</span>
      <RightOutlined className="right-arrow" />
    </Link>
  </StyledCell>
)

export default TableCellLink
