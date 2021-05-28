import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
import PriceTag from './PriceTag'
import Message from './Message'

const Product = ({ product }) => {
  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <Rating
              rating={product.rating === undefined ? 0 : product.rating}
              totalReviews={
                product.numReviews === undefined ? 0 : product.numReviews
              }
              precision={0.1}
              readOnly={true}
            ></Rating>
          </Card.Text>

          <Card.Text as="h3">
            <PriceTag price={product.price} />
          </Card.Text>
        </Card.Body>
      </Card>
      <div className="out-of-stock">
        {product.countInStock === 0 && (
          <Message variant="warning">Out of Stock</Message>
        )}
      </div>
    </>
  )
}

export default Product
