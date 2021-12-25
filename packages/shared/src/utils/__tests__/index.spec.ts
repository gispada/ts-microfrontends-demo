import { match, sortBy } from '../index'

describe('match() function', () => {
  type Item =
    | {
        type: 'foo'
        data: {
          description: string
          total?: number
        }
      }
    | {
        type: 'bar'
        data: {
          price: number
          isAvailable: boolean
        }
      }

  it('Runs the correct handler for the matched item - 1', () => {
    const item: Item = {
      type: 'foo',
      data: {
        description: 'Lorem ipsum'
      }
    }
    const result = match<Item>(item)
      .when({ type: 'foo' }, ({ data }) => [data.description])
      .when({ type: 'bar' }, ({ data }) => data.isAvailable)
      .otherwise(() => 'No match')

    expect(result).toEqual(['Lorem ipsum'])
  })

  it('Runs the correct handler for the matched item - 2', () => {
    const item: Item = {
      type: 'bar',
      data: {
        isAvailable: false,
        price: 53
      }
    }
    const result = match<Item>(item)
      .when({ type: 'foo' }, ({ data }) => [data.description])
      .when({ type: 'bar' }, ({ data }) => data.isAvailable)
      .otherwise(() => 'No match')

    expect(result).toEqual(false)
  })

  it("Runs the 'otherwise' handler when no match is found", () => {
    const item: Item = {
      type: 'bar',
      data: {
        isAvailable: false,
        price: 53
      }
    }
    const result = match<Item>(item)
      .when({ type: 'foo' }, ({ data }) => [data.description])
      .otherwise(() => 'No match')

    expect(result).toEqual('No match')
  })
})

describe('sortBy() function', () => {
  const toSort = [
    { order: 34, name: 'A' },
    { order: 22, name: 'B' },
    { order: 9, name: 'C' },
    { order: 42, name: 'D' }
  ]
  it('Correctly sorts by ascending order', () => {
    const expected = [
      { order: 9, name: 'C' },
      { order: 22, name: 'B' },
      { order: 34, name: 'A' },
      { order: 42, name: 'D' }
    ]
    expect(sortBy(toSort, 'order', 'asc')).toEqual(expected)
  })

  it('Correctly sorts by descending order', () => {
    const expected = [
      { order: 42, name: 'D' },
      { order: 34, name: 'A' },
      { order: 22, name: 'B' },
      { order: 9, name: 'C' }
    ]
    expect(sortBy(toSort, 'order', 'desc')).toEqual(expected)
  })
})
