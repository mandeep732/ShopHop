import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, setOrderDeleiver } from '../actions/orderActions'
import { ORDER_DELIVER_RESET } from '../contants/orderConstants'
import PriceTag from '../components/PriceTag'
import Title from '../components/Title'
import DateFormat from '../components/DateFormat'

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const {
    loading: loadingOrderDeliver,
    success: successOrderDeliver,
    error: errorOrderDeliver,
  } = orderDeliver

  const deliverHandler = (deliverAction) => {
    dispatch(setOrderDeleiver(order, deliverAction))
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(getOrderDetails(orderId))
    }
  }, [successOrderDeliver, history, userInfo])

  return (
    <>
      <Title text="Order Details" />

      {loading || loadingOrderDeliver ? (
        <Loader />
      ) : error || errorOrderDeliver ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1> Order Details</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping Details</h2>
                  <p>
                    <strong>
                      Address : {order.shippingAddress.address},{' '}
                      <b>
                        {order.shippingAddress.city},{' '}
                        {order.shippingAddress.stateName}, Pin Code:{' '}
                        {order.shippingAddress.postalCode}
                      </b>
                    </strong>
                  </p>
                  {order.isDelivered ? (
                    <Message variant="success">
                      Delivered on{' '}
                      <DateFormat
                        utc={order.deliveredAt}
                        type="date-time-sameline-text"
                      />
                    </Message>
                  ) : (
                    <Message variant="danger">Not Delivered Yet</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Details</h2>
                  <p>
                    <strong>Payment Method : </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">
                      Paid on{' '}
                      <DateFormat
                        utc={order.paidAt}
                        type="date-time-sameline-text"
                      />
                    </Message>
                  ) : (
                    <Message variant="danger">Not Paid Yet</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Details</h2>
                  <>
                    Ordered on{' '}
                    <DateFormat
                      utc={order.createdAt}
                      type="date-time-sameline"
                    />
                  </>
                  {order.orderItems.length === 0 ? (
                    <Message>Order is empty</Message>
                  ) : (
                    <ListGroup variant="flash">
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={5}>
                              <PriceTag price={item.price} /> x {item.qty} ={' '}
                              <PriceTag price={item.qty * item.price} />
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Price Details</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total Price</Col>
                      <Col>
                        {' '}
                        <PriceTag price={order.itemsPrice} />{' '}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Delivery Charges</Col>
                      <Col>
                        {' '}
                        <PriceTag price={order.shippingPrice} />{' '}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Amount Payable</Col>
                      <Col>
                        {' '}
                        <PriceTag price={order.totalPrice} />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {userInfo && userInfo.isAdmin && !order.isDelivered && (
                    <ListGroup.Item>
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={() => deliverHandler(true)}
                      >
                        Set as Delivered
                      </Button>
                    </ListGroup.Item>
                  )}

                  {userInfo && userInfo.isAdmin && !order.isPaid && (
                    <ListGroup.Item>
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={() => deliverHandler(false)}
                      >
                        Set as Paid
                      </Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}
export default OrderScreen
