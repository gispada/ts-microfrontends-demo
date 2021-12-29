import styled from 'styled-components'
import { Layout } from 'antd'

export const RootLayout = styled(Layout)`
  min-height: 100vh;

  .header {
    display: flex;
  }

  .logo {
    margin-right: 24px;
    img {
      max-height: 40px;
    }
  }

  .top-menu {
    flex: 1;
  }

  .content-wrapper {
    margin: 0 16px;

    .breadcrumbs {
      margin: 16px 0;
    }
  }

  .content {
    padding: 32px;
    height: 100%;
    background: #fff;
  }

  .footer {
    text-align: center;
  }
`
