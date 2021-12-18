import React, { useState, FC } from 'react'
import { Layout, Breadcrumb } from 'antd'
import Menu, { MenuItem } from './Menu'
import { RootLayout } from './styled'

const { Header, Content, Footer, Sider } = Layout

type Props = {
  logoUri?: string
  topMenu?: MenuItem[]
  sideMenu?: MenuItem[]
}

const Shell: FC<Props> = ({ logoUri, children, topMenu, sideMenu }) => {
  const [menuCollapsed, setMenuCollapsed] = useState(false)

  return (
    <RootLayout>
      <Header className="header">
        <div className="logo">
          <img src={logoUri} alt="Logo" />
        </div>
        {topMenu && (
          <div className="top-menu">
            <Menu theme="dark" mode="horizontal" items={topMenu} />
          </div>
        )}
      </Header>
      <Layout>
        {sideMenu && (
          <Sider collapsible collapsed={menuCollapsed} onCollapse={setMenuCollapsed}>
            <Menu theme="dark" mode="inline" items={sideMenu} />
          </Sider>
        )}
        <Layout>
          <Content className="content-wrapper">
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Hardcoded</Breadcrumb.Item>
            </Breadcrumb>
            <div className="content">{children}</div>
          </Content>
          <Footer className="footer">Microfrontend with TypeScript</Footer>
        </Layout>
      </Layout>
    </RootLayout>
  )
}

export default Shell
