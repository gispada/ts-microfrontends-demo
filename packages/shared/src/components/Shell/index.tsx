import React, { useState, useMemo, FC } from 'react'
import { useLocation } from 'react-router-dom'
import { Layout, Grid } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { first, last } from '../../utils'
import Menu, { MenuItem } from './Menu'
import NavigationMenu from './NavigationMenu'
import Breadcrumbs from './Breadcrumbs'
import { RootLayout } from './styled'

const { useBreakpoint } = Grid

const { Header, Content, Footer } = Layout

type Props = {
  logoUri?: string
  topMenu?: MenuItem[]
  sideMenu?: MenuItem[]
}

// From '/seg1/seg2/seg3' to ['/seg1', '/seg1/seg2', '/seg1/seg2/seg3']
const getKeysForCurrentRoute = (pathname: string) => {
  const [, ...segments] = pathname.split('/')
  return segments.reduce(
    (acc, segment) => [...acc, [last(acc), segment].join('/')],
    [] as string[]
  )
}

const Shell: FC<Props> = ({ logoUri, children, topMenu, sideMenu }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const { md } = useBreakpoint()
  const { pathname } = useLocation()
  const routeKeys = getKeysForCurrentRoute(pathname)

  const sideMenuItems = useMemo(() => {
    if (md) return sideMenu

    // Add child routes to top level routes, for the drawer
    if (!sideMenu || sideMenu.length === 0) return topMenu

    return topMenu?.map((item) =>
      first(routeKeys) === item.path ? { ...item, items: sideMenu } : item
    )
  }, [md, pathname, topMenu, sideMenu])

  return (
    <RootLayout>
      <Header className="header">
        <div className="hamburger-menu" onClick={() => setDrawerOpen(true)}>
          <MenuOutlined />
        </div>
        <div className="logo">
          <img src={logoUri} alt="Logo" />
        </div>
        {md && topMenu && (
          <div className="top-menu">
            <Menu theme="dark" mode="horizontal" items={topMenu} selectedKeys={routeKeys} />
          </div>
        )}
      </Header>

      <Layout>
        {sideMenuItems && (
          <NavigationMenu
            menu={sideMenuItems}
            selectedKeys={routeKeys}
            type={md ? 'sider' : 'drawer'}
            drawerOpen={drawerOpen}
            onCloseDrawer={() => setDrawerOpen(false)}
          />
        )}
        <Layout>
          <Content className="content-wrapper">
            <Breadcrumbs pathname={pathname} />
            <div className="content">{children}</div>
          </Content>
          <Footer className="footer">Microfrontend with TypeScript</Footer>
        </Layout>
      </Layout>
    </RootLayout>
  )
}

export default Shell
