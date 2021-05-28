import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

//@desc fetch all products
//@route GET /api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 8
  const page = Number(req.query.currentPageNo) || 1
  const sortBy = Number(req.query.sortBy) || -1
  const carousel = req.query.carousel || false

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = carousel
    ? await Product.countDocuments({ ...keyword, carousel }).sort({
        createdAt: sortBy,
      })
    : await Product.countDocuments({ ...keyword }).sort({
        createdAt: sortBy,
      })
  const products = carousel
    ? await Product.find({ ...keyword, carousel })
        .sort({ createdAt: sortBy })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    : await Product.find({ ...keyword })
        .sort({ createdAt: sortBy })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
  //page is current page no
  //pages is total no. of pages required to show all product
})

//@desc fetch all products for product Screen of admin
//@route GET /api/products/admin
//@access Public
const getProductsForProductListScreen = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json({ products })
})

//@desc fetch sinlgle product with id
//@route GET /api/products/:id
//@access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) res.json(product)
  else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//@desc     Create new product
//@route    POST /api/products
//@access   Private, isAdmin
const addProduct = asyncHandler(async (req, res) => {
  const { name, brand, image, category, price, countInStock, description } =
    req.body

  const product = new Product({
    name,
    brand,
    category,
    price,
    countInStock,
    description,
    image,
    user: req.user._id,
  })

  const createdProduct = await product.save()

  if (createdProduct) {
    res.status(201).json(createdProduct)
  } else {
    res.status(404)
    throw new Error('Product not created ')
  }
})

//@desc    update product by id
//route    PUT /api/products/:id
//@access  Private, isAdmin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, brand, category, image, price, countInStock, description } =
    req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.brand = brand
    product.category = category
    product.image = image
    product.price = price
    product.countInStock = countInStock
    product.description = description

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//@desc   upadate products  carousel property
//@route  PUT api/products/:id/carousel
//access  Private, isAdmin
const updateCarousel = asyncHandler(async (req, res) => {
  const { carousel } = req.body
  const product = await Product.findById(req.params.id)

  if (product) {
    product.carousel = carousel

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//@desc     delete the product by id
//@route    DELETE /api/product/:id
//@access   Private, isAdmin
const deleteProduct = asyncHandler(async (req, res) => {
  const productToDelete = await Product.findById(req.params.id)

  if (productToDelete) {
    await productToDelete.remove()
    res.json({
      message: 'product removed',
    })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//@desc     create new review
//@route    POST /api/products/:id/reviews
//@access   Private
const addProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() == req.user._id.toString()
    )

    if (alreadyReviewed) {
      //then delete old review
      product.reviews = product.reviews.filter((review) => {
        return review.user.toString() != req.user._id.toString()
      })
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    const r =
      product.reviews.reduce((acc, val) => val.rating + acc, 0) /
      product.reviews.length
    product.rating = Number(Math.round(r * 10) / 10)

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//@desc get log in user review
//@route GET /api/products/:id/myreview
//@access Private
const getMyReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    const review = product.reviews.find(
      (review) => review.user.toString() == req.user._id.toString()
    )

    if (review) {
      res.json({ review })
    } else {
      res.json({
        message: 'no review!',
      })
    }
  } else {
    res.status(404)
    throw new Error('No Product found')
  }
})

//@desc   get the top products
//@route  GET /produts/carousel
//access  Public
const getCarouselProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ carousel: true }).sort({
    createdAt: -1,
  })

  res.json(products)
})

export {
  getProducts,
  getProductById,
  addProduct,
  deleteProduct,
  updateProduct,
  addProductReview,
  getCarouselProducts,
  getProductsForProductListScreen,
  getMyReview,
  updateCarousel,
}
