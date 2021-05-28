import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listCarouselProducts } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import PriceTag from './PriceTag'

const ProductCarousel = () => {
  const dispatch = useDispatch()
  const productCarousel = useSelector((state) => state.productCarousel)
  const { loading, error, products } = productCarousel

  useEffect(() => {
    dispatch(listCarouselProducts())
  }, [dispatch])
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Carousel pause="hover" className="bg-dark">
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />

                <Carousel.Caption className="caro usel-caption">
                  {product.name}(<PriceTag price={product.price} />)
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  )
}

export default ProductCarousel
