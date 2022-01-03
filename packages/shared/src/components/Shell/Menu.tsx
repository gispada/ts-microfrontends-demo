import React, { ReactNode, FC } from 'react'
import { Link } from 'react-router-dom'
import { Menu as AntdMenu } from 'antd'

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
  sticky?: boolean
  selectedKeys?: string[]
  defaultOpenKeys?: string[]
  onItemClick?: (key: string) => void
}

const createMenuItem = ({ path, icon, title }: Omit<MenuItem, 'items'>) => (
  <AntdMenu.Item key={path} icon={icon}>
    <Link to={path}>{title}</Link>
  </AntdMenu.Item>
)

const Menu: FC<MenuProps> = ({
  theme,
  mode,
  items,
  selectedKeys,
  defaultOpenKeys,
  sticky,
  onItemClick
}) => {
  return (
    <AntdMenu
      theme={theme}
      mode={mode}
      selectedKeys={selectedKeys}
      defaultOpenKeys={defaultOpenKeys}
      onClick={({ key }) => onItemClick?.(key)}
      className={sticky ? 'sticky' : undefined}
    >
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
