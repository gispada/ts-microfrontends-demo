import React, { useState, FC } from 'react'
import { useLocation } from 'react-router-dom'
import { Layout, Breadcrumb, Grid } from 'antd'
import { HomeOutlined, MenuOutlined } from '@ant-design/icons'
import { capitalize, first, last } from '../../utils'
import Menu, { MenuItem } from './Menu'
import NavigationMenu from './NavigationMenu'
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

  const renderBreadcrumbs = () => (
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

  const getSideMenuItems = () => {
    if (md) return sideMenu
    // Add child routes to top level routes
    return topMenu.map((item) =>
      first(routeKeys) === item.path && sideMenu.length > 0
        ? { ...item, items: sideMenu }
        : item
    )
  }

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
        <NavigationMenu
          menu={getSideMenuItems()}
          selectedKeys={routeKeys}
          type={md ? 'sider' : 'drawer'}
          drawerOpen={drawerOpen}
          onCloseDrawer={() => setDrawerOpen(false)}
        />
        <Layout>
          <Content className="content-wrapper">
            {renderBreadcrumbs()}
            <div className="content">{children}</div>
          </Content>
          <Footer className="footer">Microfrontend with TypeScript</Footer>
        </Layout>
      </Layout>
    </RootLayout>
  )
}

export default Shell
