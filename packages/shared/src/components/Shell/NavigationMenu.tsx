import React, { useState, FC, CSSProperties } from 'react'
import { Layout, Drawer } from 'antd'
import Menu, { MenuItem } from './Menu'

const { Sider } = Layout

type Props = {
  menu: MenuItem[]
  drawerOpen?: boolean
  onCloseDrawer?: () => void
  type?: 'drawer' | 'sider'
  selectedKeys?: string[]
}

const drawerBodyStyle: CSSProperties = { padding: 0 }

const NavigationMenu: FC<Props> = ({
  selectedKeys,
  menu,
  onCloseDrawer,
  drawerOpen = false,
  type = 'sider'
}) => {
  const [menuCollapsed, setMenuCollapsed] = useState(false)

  return type === 'sider' ? (
    <Sider collapsible collapsed={menuCollapsed} onCollapse={setMenuCollapsed}>
      <Menu theme="dark" mode="inline" items={menu} selectedKeys={selectedKeys} sticky />
    </Sider>
  ) : (
    <Drawer
      destroyOnClose
      width={300}
      title="TS Microfrontends"
      placement="left"
      open={drawerOpen}
      onClose={onCloseDrawer}
      bodyStyle={drawerBodyStyle}
    >
      <Menu
        theme="light"
        mode="inline"
        items={menu}
        selectedKeys={selectedKeys}
        defaultOpenKeys={selectedKeys}
        onItemClick={onCloseDrawer}
      />
    </Drawer>
  )
}

export default NavigationMenu
