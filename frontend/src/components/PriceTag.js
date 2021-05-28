import React from 'react'

const PriceTag = ({ price }) => {
  const priceString = price
    ? price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'INR',
      })
    : ''

  return <>{priceString.substring(0, priceString.length - 3)}</>
}
export default PriceTag
