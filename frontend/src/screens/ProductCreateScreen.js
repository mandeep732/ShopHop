import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, InputGroup, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Title from '../components/Title'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { PRODUCT_CREATE_RESET } from '../contants/productConstants'
import { createProduct } from '../actions/productActions'

const CreateProductScreen = ({ history }) => {
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

  const productCreate = useSelector((state) => state.productCreate)
  const { loading, success, error, product } = productCreate

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (success) {
        dispatch({ type: PRODUCT_CREATE_RESET })
        history.push('/admin/productlist')
      }
    } else history.push('/login')
  }, [dispatch, history, userInfo, success])

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
      createProduct({
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
      <Title text="Create Product" />
      <Link className="btn btn-light my-3" to="/admin/productlist">
        BACK
      </Link>
      <h1>Create Product</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading ? (
        <Loader />
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
                      !countInStock ||
                      !description ||
                      loading
                    }
                    block
                  >
                    Create Product
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

export default CreateProductScreen
