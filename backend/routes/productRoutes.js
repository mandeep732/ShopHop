import express from 'express'
import {
  getProducts,
  getProductsForProductListScreen,
  getProductById,
  addProduct,
  deleteProduct,
  updateProduct,
  addProductReview,
  getCarouselProducts,
  updateCarousel,
  getMyReview,
} from '../controllers/productController.js'
import { isAdmin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/carousel', getCarouselProducts)

router.route('/').get(getProducts).post(protect, isAdmin, addProduct)
router.get('/admin', getProductsForProductListScreen)

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct)

router.route('/:id/reviews').post(protect, addProductReview)
router.route('/:id/myreview').get(protect, getMyReview)

router.route('/:id/carousel').put(protect, isAdmin, updateCarousel)

export default router
