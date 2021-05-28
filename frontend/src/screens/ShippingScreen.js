import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import { CheckoutSteps } from '../components/CheckoutSteps'
import Message from '../components/Message'
import Title from '../components/Title'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [stateName, setStateName] = useState(shippingAddress.stateName)
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    }
  }, [userInfo, history])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(saveShippingAddress({ address, city, stateName, postalCode }))
    history.push('/payment')
  }
  return (
    <>
      <Title text="Shipping" />
      <FormContainer>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <h1>Shipping</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="city">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your stateName"
              value={stateName}
              required
              onChange={(e) => setStateName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {message && <Message variant="danger">{message}</Message>}
          <Form.Group controlId="postalCode">
            <Form.Label>Pin Code </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your pin code"
              value={postalCode}
              required
              onChange={(e) => {
                setPostalCode(e.target.value)
                if (!isNaN(e.target.value)) {
                  if (e.target.value.length !== 6)
                    setMessage('Pin code should be six digit number')
                  else setMessage('')
                } else {
                  setMessage('Invalid pin code')
                }
              }}
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            disabled={!address || !city || !stateName || !postalCode}
          >
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}
export default ShippingScreen
