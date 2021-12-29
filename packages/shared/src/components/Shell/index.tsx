import React, { useState, FC } from 'react'
import { useLocation } from 'react-router-dom'
import { Layout, Breadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { capitalize, last } from '../../utils'
import Menu, { MenuItem } from './Menu'
import { RootLayout } from './styled'

const { Header, Content, Footer, Sider } = Layout

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
  const [menuCollapsed, setMenuCollapsed] = useState(false)

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

  return (
    <RootLayout>
      <Header className="header">
        <div className="logo">
          <img src={logoUri} alt="Logo" />
        </div>
        {topMenu && (
          <div className="top-menu">
            <Menu theme="dark" mode="horizontal" items={topMenu} selectedKeys={routeKeys} />
          </div>
        )}
      </Header>
      <Layout>
        {sideMenu && (
          <Sider collapsible collapsed={menuCollapsed} onCollapse={setMenuCollapsed}>
            <Menu theme="dark" mode="inline" items={sideMenu} selectedKeys={routeKeys} />
          </Sider>
        )}
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
