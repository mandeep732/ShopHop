import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'

//@desc     Create new order
//@route    POST /api/orders
//@access   Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order Items')
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})

//@desc     get order by ID
//@route    GET/api/orders/:id
//@access   Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await (
    await Order.findById(req.params.id)
  ).populate('user', 'name email')

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

//@desc     get logged in user orders
//@route    GET/api/orders/myorders
//@access   Private, isAdmin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await await Order.find({}).populate('user', 'id name')

  res.json(orders)
})

//@desc     get All orders by admin
//@route    GET/api/orders/
//@access   Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await await Order.find({ user: req.user._id })

  res.json(orders)
})

//@desc     Update set order to deleivered
//@route    PUT /api/orders/:id/deliver
//@access   Private, isAdmin
const setOrderToDeleivered = (deliver) =>
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
      deliver ? (order.isDelivered = true) : (order.isPaid = true)
      deliver ? (order.deliveredAt = Date.now()) : (order.paidAt = Date.now())

      const updatedOrder = await order.save()

      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })

export {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders,
  setOrderToDeleivered,
}
