import { memoize } from 'shared/utils'
import type { Product } from './types'

const MAX_CACHE_TIME = 60 * 1000

const { BASE_URL = '' } = process.env
const baseUrl = BASE_URL.endsWith('/') ? BASE_URL.substring(0, BASE_URL.length - 1) : BASE_URL

const get = <T>(resource: string) =>
  fetch(`${baseUrl}/${resource}`).then((response) => response.json() as Promise<T>)

export const getProducts = memoize(() => get<Product[]>('products'), MAX_CACHE_TIME)

export const getProductById = memoize(
  (id: string) => get<Product>(`products/${id}`),
  MAX_CACHE_TIME
)
