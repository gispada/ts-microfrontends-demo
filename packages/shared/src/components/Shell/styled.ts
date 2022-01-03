import styled from 'styled-components'
import { Layout } from 'antd'

export const RootLayout = styled(Layout)`
  min-height: 100vh;

  .sticky {
    position: sticky;
    top: 0;
  }

  .header {
    display: flex;
    position: relative;
    justify-content: flex-start;

    .hamburger-menu {
      display: none;
      position: absolute;
      left: 16px;
      height: 100%;
      svg {
        fill: white;
        transform: scale(1.4);
      }
    }
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

  // --------------- Media queries --------------- //

  @media (max-width: 767px) {
    .header {
      justify-content: center;
      position: fixed;
      z-index: 10;
      width: 100%;

      .hamburger-menu {
        display: flex;
        align-items: center;
      }
    }

    .content-wrapper {
      margin-top: 64px;
    }

    .logo {
      margin: 0;
    }
  }

  @media (max-width: 479px) {
    .content-wrapper {
      margin-left: 0;
      margin-right: 0;

      .breadcrumbs {
        margin: 16px;
      }
    }

    .content {
      padding: 16px;
    }
  }
`
