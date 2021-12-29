import memoizeOne from 'memoize-one'

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

export function match<T extends { [key: string]: any }>(item: T) {
  function makeOtherwise<R>(matchResult: R) {
    return function otherwise<O>(handler: () => O) {
      return matchResult ?? handler()
    }
  }

  function makeWhen<R>(matchResult: R) {
    return function when<P extends { [key in keyof T]?: T[key] }, O>(
      pattern: P,
      handler: (match: Extract<T, P>) => O
    ) {
      let nextResult: R | O = matchResult

      if (!nextResult) {
        const isMatch = Object.entries(pattern).every(([key, value]) => item[key] === value)
        if (isMatch) nextResult = handler(item as Extract<T, P>)
      }

      return { when: makeWhen(nextResult), otherwise: makeOtherwise(nextResult) }
    }
  }

  return { when: makeWhen(undefined) }
}

export const memoize = <T>(fn: (...args: any[]) => T, maxTime = 10000) => {
  const memoizedFn = memoizeOne(fn)
  setInterval(() => {
    memoizedFn.clear()
  }, maxTime)
  return memoizedFn
}

export const capitalize = ([first, ...rest]: string) =>
  `${first.toUpperCase()}${rest.join('')}`
