import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'
import ProductCarousel from '../components/ProductCarousel'
import Title from '../components/Title'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const currentPageNo = match.params.currentPageNo || 1
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, pages, page } = productList
  useEffect(() => {
    dispatch(listProducts(keyword, currentPageNo))
  }, [dispatch, keyword, currentPageNo])

  return (
    <>
      <Title text="Welcome to ShopHop | Home" />
      {!keyword && <ProductCarousel />}
      <h1>Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {products.length === 0 && (
            <Message variant="info">Oops no product found !</Message>
          )}
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
      <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
    </>
  )
}

export default HomeScreen
