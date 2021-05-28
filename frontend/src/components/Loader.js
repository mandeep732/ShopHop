import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = ({ type = 'lg', variant = 'dark' }) => {
  switch (type) {
    case 'lg':
      return (
        <Spinner
          animation="border"
          role="status"
          style={{
            width: '100px',
            height: '100px',
            margin: 'auto',
            display: 'block',
          }}
          variant={variant}
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    case 'sm':
      return <Spinner animation="border" variant={variant} />
    case 'btn':
      return <Spinner animation="border" size="sm" variant={variant} />
  }
}

export default Loader
