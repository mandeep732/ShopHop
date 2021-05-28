import express from 'express'
import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders,
  setOrderToDeleivered,
} from '../controllers/orderController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems).get(protect, isAdmin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/deliver').put(protect, isAdmin, setOrderToDeleivered(true))
router.route('/:id/paid').put(protect, isAdmin, setOrderToDeleivered(false))

export default router
