import { uuid } from 'shared/utils'
import type { Subscription } from './types'

export const subscriptions: Subscription[] = [
  {
    id: uuid(),
    description: 'Lorem ipsum dolor sit amet',
    timestamp: 1638776796000,
    amount: 50.34,
    status: 'approved'
  },
  {
    id: uuid(),
    description: 'Consectetur adipiscing elitt',
    timestamp: 1636127076000,
    amount: 124.99,
    status: 'rejected'
  },
  {
    id: uuid(),
    description: 'Sed do eiusmod tempor incididunt',
    timestamp: 1634673756000,
    amount: 77,
    status: 'approved'
  },
  {
    id: uuid(),
    description: 'Labore et dolore magna aliqua',
    timestamp: 1625426556000,
    amount: 50.34,
    status: 'approved'
  },
  {
    id: uuid(),
    description: 'Ut enim ad minim veniam',
    timestamp: 1640072796000,
    amount: 82.7,
    status: 'pending'
  },
  {
    id: uuid(),
    description: 'Quis nostrud exercitation ullamco laboris',
    timestamp: 1632480276000,
    amount: 49,
    status: 'approved'
  }
]
