import { PageHeader } from 'antd'
import styled from 'styled-components'

export const StyledPageHeader = styled(PageHeader)`
  padding-left: 0;

  .ant-page-header-heading-left {
    height: 48px;
  }

  .ant-avatar {
    height: 48px;
    width: 48px;
  }

  @media (max-width: 767px) {
    .ant-page-header-heading-left {
      height: auto;
      flex-direction: column;
      align-items: flex-start;

      .ant-page-header-heading-title,
      .ant-page-header-heading-sub-title {
        width: 100%;
      }
    }
  }
`
