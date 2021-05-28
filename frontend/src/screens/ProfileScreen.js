import React, { useState, useEffect } from 'react'
import {
  Table,
  Form,
  Button,
  Row,
  Col,
  ListGroup,
  Card,
  Container,
  Image,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getUserDetails,
  logout,
  updateUserProfile,
} from '../actions/userActions'
import { getMyOrderList } from '../actions/orderActions'
import Title from '../components/Title'
import {
  USER_DETAILS_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_UPDATE_PROFILE_RESET,
} from '../contants/userConstants'
import DateFormat from '../components/DateFormat'
import PriceTag from '../components/PriceTag'
import OrderInfo from '../components/OrderInfo'

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [editProfile, setEditProfile] = useState(false)
  const [profileUpdatedSuccessfully, setProfileUpdatedSuccessfully] =
    useState(false)

  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)

  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const {
    loading: loadingUpdateProfile,
    success: successUpdateProfile,
    userInfo: userInfoUpdateProfile,
    error: errorUpdateProfile,
  } = userUpdateProfile

  const myOrderList = useSelector((state) => state.myOrderList)
  const { loading: loadingOrders, error: errorOrders, orders } = myOrderList

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
        dispatch(getMyOrderList())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }

    if (successUpdateProfile) {
      setMessage(null)
      setPassword('')
      setConfirmPassword('')
      setEditProfile(false)

      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: {
          _id: userInfoUpdateProfile._id,
          name: userInfoUpdateProfile.name,
          email: userInfoUpdateProfile.email,
          isAdmin: userInfoUpdateProfile.isAdmin,
        },
      })
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: userInfoUpdateProfile,
      })

      localStorage.setItem('userInfo', JSON.stringify(userInfoUpdateProfile))
      dispatch({ type: USER_UPDATE_PROFILE_RESET })
      setProfileUpdatedSuccessfully(true)
    }
  }, [dispatch, history, userInfo, user, successUpdateProfile])

  const submitHandler = (e) => {
    e.preventDefault()
    if (localStorage.getItem('userInfo')) {
      if (password) {
        if (password !== confirmPassword) {
          setMessage('Password do not match')
        } else if (password.length <= 5) {
          setMessage('Passwords must be at least 6 characters')
        } else {
          dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
      } else {
        dispatch(updateUserProfile({ id: user._id, name, email, password }))
      }
    } else {
      dispatch(logout())
      history.push('/')
    }
  }
  return (
    <>
      <Title text="My Profile" />
      <Row>
        <Col md={3}>
          <h2>My Profile</h2>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {errorUpdateProfile && (
            <Message variant="danger">{errorUpdateProfile}</Message>
          )}
          {profileUpdatedSuccessfully && (
            <Message variant="success">Profile Updated Successfully</Message>
          )}
          {loading || loadingUpdateProfile ? (
            <Loader />
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!editProfile}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!editProfile}
                ></Form.Control>
              </Form.Group>
              {editProfile ? (
                <>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>

                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>

                    <Form.Control
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="editProfile">
                    <Form.Check
                      type="checkbox"
                      label="Edit my profile"
                      checked={editProfile}
                      onChange={(e) => setEditProfile(e.target.checked)}
                    ></Form.Check>
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!name || !email}
                  >
                    Update
                  </Button>
                </>
              ) : (
                <>
                  <Form.Group controlId="editProfile">
                    <Form.Check
                      type="checkbox"
                      label="Edit my profile"
                      checked={editProfile}
                      onChange={(e) => {
                        setName(user.name)
                        setEmail(user.email)
                        setEditProfile(e.target.checked)
                      }}
                    ></Form.Check>
                  </Form.Group>
                </>
              )}
            </Form>
          )}
        </Col>
        <Col md={9}>
          <h2>My Orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : orders.length === 0 ? (
            <>
              You haven't purchased anything!{' '}
              <Link to="/">Let's order something!</Link>
            </>
          ) : (
            orders && (
              <ListGroup variant="flush">
                {orders
                  .sort((a, b) => {
                    var keyA = new Date(a.createdAt),
                      keyB = new Date(b.createdAt)
                    if (keyA < keyB) return 1
                    if (keyA > keyB) return -1
                    return 0
                  })
                  .map((order) => (
                    <ListGroup.Item key={order._id}>
                      <OrderInfo order={order} />
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            )
          )}
        </Col>
      </Row>
    </>
  )
}
export default ProfileScreen
