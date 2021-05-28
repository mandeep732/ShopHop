import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import { CheckoutSteps } from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { listProductDetails } from '../actions/productActions'
import PriceTag from '../components/PriceTag'
import { ORDER_CREATE_RESET } from '../contants/orderConstants'
import { CART_REMOVE_ALL_ITEM } from '../contants/cartConstants'
import Title from '../components/Title'
import Loader from '../components/Loader'

const PlaceOrderScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { loading, order, success, error } = orderCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  //i don't think its need
  // const productDetails = useSelector((state) => state.productDetails)
  // const {
  //   loading: loadingProductDetails,
  //   error: errorProductDetails,
  //   ProductDetails,
  // } = productDetails

  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    } else {
      if (success) {
        history.push(`/order/${order._id}`)
        dispatch({ type: ORDER_CREATE_RESET })
      }
    }
  }, [history, success, userInfo, dispatch])

  const placeOrderHandler = () => {
    if (userInfo) {
      dispatch(
        createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          totalPrice: cart.totalPrice,
        })
      )
      dispatch({ type: CART_REMOVE_ALL_ITEM })
      localStorage.removeItem('cartItems')
    }
  }

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  cart.shippingPrice = cart.itemsPrice >= 2000 ? 40 : 60
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice

  return (
    <>
      <Title text="Place Order" />
      {cart && cart.paymentMethod ? (
        <>
          <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping Details</h2>
                  <p>
                    <strong>
                      Address : {cart.shippingAddress.address},{' '}
                      <b>
                        {cart.shippingAddress.city},{' '}
                        {cart.shippingAddress.stateName}, Pin Code:{' '}
                        {cart.shippingAddress.postalCode}
                      </b>
                    </strong>
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Details</h2>
                  <strong>Payment Method : </strong>
                  {cart.paymentMethod.paymentMethod}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Details</h2>
                  {cart && cart.cartItems.length === 0 ? (
                    <Message>Your cart is empty</Message>
                  ) : (
                    <ListGroup variant="flash">
                      {cart.cartItems.map((item, index) => (
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
                        <PriceTag price={cart.itemsPrice} />{' '}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Delivery Charges</Col>
                      <Col>
                        {' '}
                        <PriceTag price={cart.shippingPrice} />{' '}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Amount Payable</Col>
                      <Col>
                        {' '}
                        <PriceTag price={cart.totalPrice} />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {error ? (
                      <Message variant="danger">{error}</Message>
                    ) : (
                      <Button
                        type="button"
                        className="btn-block"
                        disabled={cart.cartItems === 0 || loading}
                        onClick={placeOrderHandler}
                      >
                        Place Order
                      </Button>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <></>
      )}
    </>
  )
}
export default PlaceOrderScreen
