import React, { FC } from 'react'
import { Typography } from 'antd'

const { Title, Paragraph } = Typography

type Level = 1 | 2 | 3 | 4 | 5
type TitleLevel = {
  [K in Level]: `h${K}`
}[Level]

type Props = {
  [K in TitleLevel]?: boolean
} & {
  strong?: boolean
}

const levelsMap: Record<TitleLevel, Level> = {
  h1: 1,
  h2: 2,
  h3: 3,
  h4: 4,
  h5: 5
}

const getTitleLevel = (props: Props) => {
  const titleLevel = (Object.keys(levelsMap) as TitleLevel[]).find((key) => !!props[key])
  return titleLevel ? levelsMap[titleLevel] : undefined
}

const Text: FC<Props> = ({ children, strong, ...rest }) => {
  const titleLevel = getTitleLevel(rest)

  if (titleLevel) {
    return <Title level={titleLevel}>{children}</Title>
  }

  return <Paragraph strong={strong}>{children}</Paragraph>
}

export default Text
