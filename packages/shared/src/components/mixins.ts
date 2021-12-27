import { css } from 'styled-components'

type Margins = {
  top?: number
  right?: number
  bottom?: number
  left?: number
}

export const margins = css<{ $margins?: Margins }>`
  ${({ $margins = {} }) =>
    Object.entries($margins).reduce(
      (acc, [key, value]) => `${acc}margin-${key}:${value}px;`,
      ''
    )};
`
