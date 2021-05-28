import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  OverlayTrigger,
  Tooltip,
  InputGroup,
} from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listProductDetails,
  addProductReview,
  getCurrUserReview,
} from '../actions/productActions'
import {
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_CURR_USER_REVIEW_RESET,
  PRODUCT_REVIEW_RESET_RATING,
  PRODUCT_REVIEW_SET_COMMENT,
} from '../contants/productConstants'
import Title from '../components/Title'
import PriceTag from '../components/PriceTag'
import ReviewComment from '../components/ReviewComment'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    loading: loadingProductReviewCreate,
    success: successProductReviewCreate,
    error: errorProductReviewCreate,
  } = productReviewCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successProductReviewCreate) {
      alert('Thankyou for rating!')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }

    dispatch(listProductDetails(match.params.id))
  }, [match, dispatch, successProductReviewCreate])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }
  const submitReviewHandler = (e) => {
    e.preventDefault()
    dispatch(
      addProductReview(match.params.id, {
        rating: rating,
        comment,
      })
    )
  }
  const usehistory = useHistory()
  const goToPreviousPath = () => {
    usehistory.goBack()
  }

  return (
    <>
      {' '}
      <Button onClick={goToPreviousPath} className="btn btn-light my-3">
        Back
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Title text={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>
                    <strong>{product.name}</strong>
                  </h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  Price : <PriceTag price={product.price}></PriceTag>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={product.rating === undefined ? 0 : product.rating}
                    totalReviews={
                      product.numReviews === undefined ? 0 : product.numReviews
                    }
                  />
                </ListGroup.Item>

                <ListGroup.Item>
                  Description : {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Brand :</Col>
                      <Col>{product.brand}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {product.countInStock > 0 ? (
                      <Message variant="info">Add to card now!</Message>
                    ) : (
                      <Message variant="warning">Out Of Stock</Message>
                    )}
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col md={4}>Qty </Col>
                        <Col md={8}>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()]
                              .slice(0, 5)
                              .map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <Button
                    onClick={addToCartHandler}
                    className="btn-black"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add To Card
                  </Button>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Ratings & Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup>
                {product.reviews && (
                  <ReviewComment
                    reviews={product.reviews}
                    numReviews={product.numReviews}
                  />
                )}

                <ListGroup.Item>
                  <h2>Write a review</h2>
                  {errorProductReviewCreate && (
                    <Message variant="danger">
                      {errorProductReviewCreate}
                    </Message>
                  )}
                  {loadingProductReviewCreate ? (
                    <Loader />
                  ) : userInfo ? (
                    <Form onSubmit={submitReviewHandler}>
                      {rating !== 0 && (
                        <Rating
                          rating={rating}
                          onlyStar={true}
                          wrtieReview={true}
                        />
                      )}
                      <Form.Group controlId="rating">
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text>Rating : </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            as="select"
                            onChange={(e) => {
                              setRating(e.target.value)
                              if (e.target.value === 'Rate here!') setRating(0)
                            }}
                            value={rating}
                          >
                            <option>Rate here!</option>
                            <option>0.5</option>
                            <option>1</option>
                            <option>1.5</option>
                            <option>2</option>
                            <option>2.5</option>
                            <option>3</option>
                            <option>3.5</option>
                            <option>4</option>
                            <option>4.5</option>
                            <option>5</option>
                          </Form.Control>
                        </InputGroup>
                      </Form.Group>

                      <Form.Group controlId="comment">
                        <Form.Control
                          as="textarea"
                          row="4"
                          value={comment}
                          onChange={(e) => {
                            setComment(e.target.value)
                          }}
                          placeholder="Comment here!"
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={rating === 0 ? true : false}
                      >
                        Submit Review
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      <Link to="/login">Login</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
