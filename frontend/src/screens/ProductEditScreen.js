import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  Form,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
  Image,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Title from '../components/Title'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails, updateProduct } from '../actions/productActions'

import FormContainer from '../components/FormContainer'
import { PRODUCT_UPDATE_RESET } from '../contants/productConstants'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id
  const defaultImage = '\\uploads\\sampleImage.jpg'

  const [name, setName] = useState('')
  const [image, setImage] = useState(defaultImage)
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(null)
  const [countInStock, setCountInStock] = useState(null)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingProductUpdate,
    error: errorProductUpdate,
    success: successProductUpdate,
    product: productProductUpdate,
  } = productUpdate

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (successProductUpdate) {
        dispatch(listProductDetails(productProductUpdate._id))
        dispatch({ type: PRODUCT_UPDATE_RESET })
      } else {
        if (product && (!product.name || product._id !== productId)) {
          dispatch(listProductDetails(productId))
        } else {
          if (product) {
            setName(product.name)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setPrice(product.price)
            setCountInStock(product.countInStock)
            setDescription(product.description)
          }
        }
      }
    } else {
      history.push('/login')
    }
  }, [dispatch, history, productId, product, successProductUpdate, userInfo])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post(`/api/upload`, formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        image,
        brand,
        category,
        price,
        countInStock,
        description,
      })
    )
  }

  return (
    <>
      <Title text="Edit Product" />
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <h1>Edit Product</h1>

      {errorProductUpdate && (
        <Message variant="danger">{errorProductUpdate}</Message>
      )}
      {loading || loadingProductUpdate ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Row>
            <Col md={5}>
              <Row>
                <Col md={8}>
                  <Image src={image} alt="url" fluid />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          {uploading ? (
                            <Loader type="btn" variant="dark" />
                          ) : (
                            'url'
                          )}
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="text"
                        placeholder="Product Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                      ></Form.Control>
                    </InputGroup>

                    {uploading ? (
                      <Form.File
                        id="image-file"
                        label="Uploading..."
                        custom
                        onChange={uploadFileHandler}
                        disabled
                      ></Form.File>
                    ) : (
                      <Form.File
                        id="image-file"
                        label="Choose File"
                        custom
                        onChange={uploadFileHandler}
                      ></Form.File>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Col md={5}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Name of product"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Brand of product"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Category type"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Product Description"
                  value={description}
                  rows={4}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Row>
                <Col>
                  <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>

                    <Form.Control
                      type="number"
                      placeholder="Price of product"
                      value={price}
                      onChange={(e) =>
                        setPrice(e.target.value < 1 ? 0 : e.target.value)
                      }
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="countinstock">
                    <Form.Label>Stock Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Product quantity in stock"
                      value={countInStock}
                      onChange={(e) =>
                        setCountInStock(e.target.value < 1 ? 0 : e.target.value)
                      }
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={
                      !name ||
                      !image ||
                      !brand ||
                      !category ||
                      !price ||
                      !description ||
                      loadingProductUpdate
                    }
                    block
                  >
                    Update
                  </Button>
                </Col>
              </Row>
            </Col>
          </Form.Row>
        </Form>
      )}
    </>
  )
}

export default ProductEditScreen
