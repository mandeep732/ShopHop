import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Table,
  Button,
  Row,
  Col,
  Image,
  ListGroup,
  Form,
  InputGroup,
  FormControl,
  Badge,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Title from '../components/Title'

import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  deleteProductById,
  listProducts,
  updateProductCarousel,
} from '../actions/productActions'
import DateFormat from '../components/DateFormat'
import PriceTag from '../components/PriceTag'
import Paginate from '../components/Paginate'

const ProductListScreen = ({ history, match }) => {
  const keyword = match.params.keyword || ''
  const currentPageNo = match.params.currentPageNo || 1

  const [searchBox, setSearchBox] = useState(keyword)
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, pages, page } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productSort = useSelector((state) => state.productSort)
  const { sortOrder } = productSort

  const productCarouselSort = useSelector((state) => state.productCarouselSort)
  const { carouselSort } = productCarouselSort

  const productUpdateCarousel = useSelector(
    (state) => state.productUpdateCarousel
  )
  const {
    loading: loadingCarousel,
    success: successCarousel,
    product: productCarousel,
    error: errorCarousel,
  } = productUpdateCarousel

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingProductDelete,
    success: successProductDelete,
    error: errorProductDelete,
  } = productDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(
        listProducts(keyword, currentPageNo, null, sortOrder, carouselSort)
      )
    } else history.push('/login')
  }, [
    dispatch,
    history,
    userInfo,
    successProductDelete,
    currentPageNo,
    keyword,
    sortOrder,
    successCarousel,
    carouselSort,
  ])

  const deleteHandler = (id, name, brand) => {
    if (window.confirm(`Confirm Delete product : ${name}, ${brand}`))
      dispatch(deleteProductById(id))
  }
  const createProductHandler = () => {
    history.push('/admin/createProduct')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (searchBox.trim()) {
      history.push(`/admin/productlist/search/${searchBox}`)
    } else {
      history.push('/admin/productlist')
    }
  }

  const carouselHandler = (id, carousel, name, brand) => {
    if (carousel) {
      if (
        window.confirm(
          `Are you sure remove product ${name},${brand} from Carousel ?`
        )
      ) {
        dispatch(updateProductCarousel(id, !carousel))
      }
    } else {
      dispatch(updateProductCarousel(id, !carousel))
    }
  }
  return (
    <>
      <Title text="Manage Products" />
      <Row className="align-items-center">
        <Col>
          <h1>Manage Products</h1>
        </Col>

        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            Create Product
          </Button>
        </Col>
      </Row>
      {errorProductDelete && (
        <Message variant="danger">{errorProductDelete}</Message>
      )}
      {loading || loadingProductDelete ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>
                  {' '}
                  <Form onSubmit={submitHandler} inline>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <Icon.Search />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="text"
                        name="searchBox"
                        value={searchBox}
                        onChange={(e) => setSearchBox(e.target.value)}
                        placeholder="Search product name"
                      ></Form.Control>
                    </InputGroup>
                  </Form>
                </Col>
                <Col>
                  <Form.Check
                    type="checkbox"
                    label="Recent Created Product First"
                    checked={sortOrder === -1 ? true : false}
                    onChange={(e) => {
                      sortOrder === -1
                        ? dispatch({ type: 'SORT_BY_ASCENDING' })
                        : dispatch({ type: 'SORT_BY_DESCENDING' })
                    }}
                  ></Form.Check>
                </Col>
                <Col>
                  <Form.Check
                    type="checkbox"
                    label="Carousel Product"
                    checked={carouselSort}
                    onChange={(e) => {
                      carouselSort
                        ? dispatch({ type: 'SORT_BY_CAROUSEL_RESET' })
                        : dispatch({ type: 'SORT_BY_CAROUSEL' })
                    }}
                  ></Form.Check>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Created On</th>
                    <th>Image</th>
                    <th>Product Details</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product._id}>
                      <td>
                        <Row>
                          <Col>
                            <Row>
                              <Col>
                                <DateFormat
                                  utc={product.createdAt}
                                  type="time"
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <DateFormat
                                  utc={product.createdAt}
                                  type="date"
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </td>
                      <td>
                        <Image src={product.image} width="50" />
                      </td>
                      <td>
                        <Row>
                          <Col>
                            <Row>
                              <Col>Name : {product.name}</Col>
                            </Row>
                            <Row>
                              <Col>Brand : {product.brand}</Col>
                            </Row>
                            <Row>
                              <Col>Category : {product.category}</Col>
                            </Row>

                            <Row>
                              <Col className="bold">
                                Price : <PriceTag price={product.price} />
                              </Col>
                            </Row>
                            <Row>
                              <Col className="bold-arial">
                                Product Id #
                                <Link to={`/product/${product._id}`}>
                                  {product._id}
                                </Link>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                {product.carousel && (
                                  <Badge variant="success">
                                    Carousel Product
                                  </Badge>
                                )}
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </td>
                      <td>{product.countInStock}</td>

                      <td>
                        <Row>
                          <Col>
                            <OverlayTrigger
                              overlay={
                                <Tooltip>
                                  {product.carousel
                                    ? 'Remove from Carousel'
                                    : 'Make product Carousel'}
                                </Tooltip>
                              }
                            >
                              <span className="d-inline-block">
                                <Button
                                  className="btn-sm"
                                  onClick={() =>
                                    carouselHandler(
                                      product._id,
                                      product.carousel,
                                      product.name,
                                      product.brand
                                    )
                                  }
                                >
                                  <Icon.Cast />
                                </Button>
                              </span>
                            </OverlayTrigger>

                            <OverlayTrigger
                              overlay={<Tooltip>Edit Product Details</Tooltip>}
                            >
                              <span className="d-inline-block">
                                <LinkContainer
                                  to={`/admin/product/${product._id}/edit`}
                                >
                                  <Button variant="light" className="btn-sm">
                                    <i className="fas fa-edit" />
                                  </Button>
                                </LinkContainer>{' '}
                              </span>
                            </OverlayTrigger>
                            <OverlayTrigger
                              overlay={<Tooltip>Delete Product</Tooltip>}
                            >
                              <span className="d-inline-block">
                                <Button
                                  variant="danger"
                                  className="btn-sm"
                                  onClick={() =>
                                    deleteHandler(
                                      product._id,
                                      product.name,
                                      product.brand
                                    )
                                  }
                                >
                                  <i className="fas fa-trash" />
                                </Button>
                              </span>
                            </OverlayTrigger>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <OverlayTrigger
                              overlay={<Tooltip>Product page</Tooltip>}
                            >
                              <span className="d-inline-block">
                                <LinkContainer to={`/product/${product._id}`}>
                                  <Button
                                    variant="dark"
                                    className="btn-sm my-2"
                                    block
                                  >
                                    Product Page
                                  </Button>
                                </LinkContainer>
                              </span>
                            </OverlayTrigger>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ListGroup.Item>
          </ListGroup>
          <Paginate
            pages={pages}
            page={page}
            isAdmin={true}
            keyword={keyword}
          ></Paginate>
        </>
      )}
    </>
  )
}

export default ProductListScreen
