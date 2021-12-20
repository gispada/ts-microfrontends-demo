export type SubscriptionStatus = 'approved' | 'rejected' | 'pending'

export type Subscription = {
  id: string
  description?: string
  timestamp: number
  amount: number
  status: SubscriptionStatus
}
