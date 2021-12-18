import React from 'react'
import { UserOutlined, LockOutlined, WalletOutlined } from '@ant-design/icons'
import type { MenuItem } from 'shared/Components'

export const sideMenu: MenuItem[] = [
  {
    title: 'Informations',
    href: '/info',
    icon: <UserOutlined />
  },
  {
    title: 'Security',
    href: '/security',
    icon: <LockOutlined />
  },
  {
    title: 'Subscriptions',
    href: '/subscriptions',
    icon: <WalletOutlined />
  }
]
