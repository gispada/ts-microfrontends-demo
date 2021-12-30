import React, { useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import mount from 'product/mount'

const Product = () => {
  const ref = useRef(null)
  const { id } = useParams()

  useEffect(() => {
    return mount(ref.current!, { productId: id })
  })

  return <div ref={ref}></div>
}

export default Product
