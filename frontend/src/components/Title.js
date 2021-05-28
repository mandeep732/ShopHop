import React from 'react'
import { Helmet } from 'react-helmet'

const Title = ({ text }) => {
  return (
    <Helmet>
      <title>{text}</title>
    </Helmet>
  )
}

export default Title
