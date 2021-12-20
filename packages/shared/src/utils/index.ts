export { default as memoizeOne } from 'memoize-one'
export { v4 as uuid } from 'uuid'
export { default as dayjs } from 'dayjs'

export function sortBy<T extends { [k: string]: any }, K extends keyof T>(
  array: T[],
  key: K,
  order?: 'asc' | 'desc'
) {
  return array.sort(({ [key]: a }, { [key]: b }) => (order === 'desc' ? b - a : a - b))
}

export function first<T>(array: T[]): T | undefined {
  return array[0]
}

export function last<T>(array: T[]): T | undefined {
  return array[array.length - 1]
}
