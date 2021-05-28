import axios from 'axios'
import * as productContants from '../contants/productConstants'

export const listProducts =
  (
    keyword = '',
    currentPageNo = '',
    pageSize = 8,
    sortBy = -1,
    carouselSort = false
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: productContants.PRODUCT_LIST_REQUEST })

      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&currentPageNo=${currentPageNo}&pageSize=${pageSize}&sortBy=${sortBy}&carousel=${carouselSort}`
      )

      dispatch({
        type: productContants.PRODUCT_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: productContants.PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: productContants.PRODUCT_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
      type: productContants.PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: productContants.PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: productContants.PRODUCT_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/products`, product, config)

    dispatch({
      type: productContants.PRODUCT_CREATE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: productContants.PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteProductById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: productContants.PRODUCT_DELETE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(`/api/products/${id}`, config)

    dispatch({ type: productContants.PRODUCT_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: productContants.PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: productContants.PRODUCT_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    )

    dispatch({
      type: productContants.PRODUCT_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: productContants.PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//carousel should be 1 or 0
export const updateProductCarousel =
  (id, carousel) => async (dispatch, getState) => {
    try {
      dispatch({
        type: productContants.PRODUCT_UPDATE_CAROUSEL_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.put(
        `/api/products/${id}/carousel`,
        { carousel: carousel },
        config
      )

      dispatch({
        type: productContants.PRODUCT_UPDATE_CAROUSEL_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: productContants.PRODUCT_UPDATE_CAROUSEL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const addProductReview = (id, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: productContants.PRODUCT_CREATE_REVIEW_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/products/${id}/reviews`, review, config)

    dispatch({ type: productContants.PRODUCT_CREATE_REVIEW_SUCCESS })
  } catch (error) {
    dispatch({
      type: productContants.PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getCurrUserReview = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: productContants.PRODUCT_CURR_USER_REVIEW_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/products/${id}/myreview`, config)

    dispatch({
      type: productContants.PRODUCT_CURR_USER_REVIEW_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: productContants.PRODUCT_CURR_USER_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listCarouselProducts = () => async (dispatch) => {
  try {
    dispatch({ type: productContants.PRODUCT_CAROUSEL_REQUEST })

    const { data } = await axios.get(`/api/products/carousel`)

    dispatch({
      type: productContants.PRODUCT_CAROUSEL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: productContants.PRODUCT_CAROUSEL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
