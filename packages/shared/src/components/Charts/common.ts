export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export type ChartData = {
  [key: string]: string | number
}

export type Formatter = (value: any) => string
