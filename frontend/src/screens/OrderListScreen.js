import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import OrderInfo from '../components/OrderInfo'
import Title from '../components/Title'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderList } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getOrderList())
    } else history.push('/login')
  }, [dispatch, history, userInfo])

  return (
    <>
      {' '}
      <Title text="Manage Orders" />
      <h1>Manage Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : orders && orders.length !== 0 ? (
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
                <OrderInfo order={order} isAdmin={true} user={order.user} />
              </ListGroup.Item>
            ))}
        </ListGroup>
      ) : (
        <Message variant="warning">No orders!!</Message>
      )}
    </>
  )
}

export default OrderListScreen
