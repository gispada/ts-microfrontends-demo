import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'

const { SubMenu } = Menu

export type MenuItem = {
  title: string
  icon?: ReactNode
  href: string
  items?: MenuItem[]
}

type MenuConfig = {
  theme: 'dark' | 'light'
  mode: 'vertical' | 'horizontal' | 'inline'
}

const createMenuItem = ({ href, icon, title }: MenuItem) => (
  <Menu.Item key={href} icon={icon}>
    <Link to={href}>{title}</Link>
  </Menu.Item>
)

export const createMenu = (items: MenuItem[], { theme, mode }: MenuConfig) => (
  <Menu theme={theme} mode={mode}>
    {items.map(({ items, ...rest }) => {
      if (items) {
        return (
          <SubMenu key={rest.href} title={rest.title} icon={rest.icon}>
            {items.map(createMenuItem)}
          </SubMenu>
        )
      }
      return createMenuItem(rest)
    })}
  </Menu>
)
