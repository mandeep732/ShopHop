import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import { CheckoutSteps } from '../components/CheckoutSteps'
import Title from '../components/Title'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('shipping')
  }

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery')

  const dispatch = useDispatch()

  useEffect(() => {
    if (!userInfo) history.push('/')
  }, [history, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod({ paymentMethod }))
    history.push('/placeorder')
  }
  return (
    <>
      <Title text="Payment" />
      <FormContainer>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Payment Method</Form.Label>

            <Col>
              <Form.Check
                type="radio"
                label="UPI"
                id="upi"
                name="paymentMethod"
                value="UPI"
                disabled={true}
                onChange={(e) => {
                  setPaymentMethod(e.target.value)
                }}
              ></Form.Check>
              <Form.Check
                type="radio"
                label="Credit / Debit / ATM card"
                id="card"
                name="paymentMethod"
                value="Credit / Debit / ATM card"
                disabled={true}
                onChange={(e) => {
                  setPaymentMethod(e.target.value)
                }}
              ></Form.Check>
              <Form.Check
                type="radio"
                label="Cash on Delivery"
                id="cod"
                name="paymentMethod"
                value="Cash on Delivery"
                onChange={(e) => {
                  setPaymentMethod(e.target.value)
                }}
                checked
              ></Form.Check>
            </Col>
          </Form.Group>
          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default PaymentScreen
