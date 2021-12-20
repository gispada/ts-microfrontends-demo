import React, { ReactNode, FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu as AntdMenu } from 'antd'
import { last } from '../../utils'

const { SubMenu } = AntdMenu

export type MenuItem = {
  title: string
  icon?: ReactNode
  path: string
  items?: MenuItem[]
}

type MenuProps = {
  items: MenuItem[]
  theme: 'dark' | 'light'
  mode: 'vertical' | 'horizontal' | 'inline'
}

const createMenuItem = ({ path, icon, title }: Omit<MenuItem, 'items'>) => (
  <AntdMenu.Item key={path} icon={icon}>
    <Link to={path}>{title}</Link>
  </AntdMenu.Item>
)

// From '/seg1/seg2/seg3' to ['/seg1', '/seg1/seg2', '/seg1/seg2/seg3']
const getKeysForCurrentRoute = (pathname: string) => {
  const [, ...segments] = pathname.split('/')
  return segments.reduce(
    (acc, segment) => [...acc, [last(acc), segment].join('/')],
    [] as string[]
  )
}

const Menu: FC<MenuProps> = ({ theme, mode, items }) => {
  const { pathname } = useLocation()

  return (
    <AntdMenu theme={theme} mode={mode} selectedKeys={getKeysForCurrentRoute(pathname)}>
      {items.map(({ items, ...rest }) => {
        if (items) {
          return (
            <SubMenu key={rest.path} title={rest.title} icon={rest.icon}>
              {items.map(createMenuItem)}
            </SubMenu>
          )
        }
        return createMenuItem(rest)
      })}
    </AntdMenu>
  )
}

export default React.memo(Menu)
