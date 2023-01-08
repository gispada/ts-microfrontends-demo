import React, { ReactNode, FC } from 'react'
import { Link } from 'react-router-dom'
import { Menu as AntdMenu } from 'antd'

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

const createMenuItem = ({ path, icon, title }: Omit<MenuItem, 'items'>) => ({
  icon,
  key: path,
  label: <Link to={path}>{title}</Link>
})

const Menu: FC<MenuProps> = ({
  theme,
  mode,
  items,
  selectedKeys,
  defaultOpenKeys,
  sticky,
  onItemClick
}) => {
  const menuItems = items.map(({ items, ...rest }) => {
    return items
      ? {
          key: rest.path,
          label: rest.title,
          icon: rest.icon,
          children: items.map(createMenuItem)
        }
      : createMenuItem(rest)
  })

  return (
    <AntdMenu
      theme={theme}
      mode={mode}
      items={menuItems}
      selectedKeys={selectedKeys}
      defaultOpenKeys={defaultOpenKeys}
      onClick={({ key }) => onItemClick?.(key)}
      className={sticky ? 'sticky' : undefined}
    />
  )
}

export default React.memo(Menu)
