import * as productContants from '../contants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case productContants.PRODUCT_LIST_REQUEST:
      return { loading: true }
    case productContants.PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case productContants.PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const productSortReducer = (state = { sortOrder: -1 }, action) => {
  switch (action.type) {
    case 'SORT_BY_ASCENDING':
      return {
        sortOrder: 1,
      }
    case 'SORT_BY_DESCENDING':
      return {
        sortOrder: -1,
      }
    default:
      return state
  }
}

export const productCarouselSortReducer = (
  state = { carouselSort: false },
  action
) => {
  switch (action.type) {
    case 'SORT_BY_CAROUSEL':
      return {
        carouselSort: true,
      }
    case 'SORT_BY_CAROUSEL_RESET':
      return {
        carouselSort: false,
      }
    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case productContants.PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state }
    case productContants.PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case productContants.PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case productContants.PRODUCT_DETAILS_RESET:
      return {}
    default:
      return state
  }
}

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case productContants.PRODUCT_CREATE_REQUEST:
      return { loading: true }
    case productContants.PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case productContants.PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case productContants.PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case productContants.PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
      }
    case productContants.PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case productContants.PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case productContants.PRODUCT_UPDATE_REQUEST:
      return {
        loading: true,
        success: false,
      }
    case productContants.PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        success: true,
      }
    case productContants.PRODUCT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      }
    case productContants.PRODUCT_UPDATE_RESET:
      return {
        loading: false,
        product: {},
        success: false,
      }
    default:
      return state
  }
}

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case productContants.PRODUCT_CREATE_REVIEW_REQUEST:
      return {
        loading: true,
      }
    case productContants.PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        laoding: false,
        success: true,
      }
    case productContants.PRODUCT_CREATE_REVIEW_FAIL:
      return {
        laoding: false,
        success: false,
        error: action.payload,
      }
    case productContants.PRODUCT_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const productCarouselReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case productContants.PRODUCT_CAROUSEL_REQUEST:
      return {
        loading: true,
        products: [],
      }
    case productContants.PRODUCT_CAROUSEL_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      }
    case productContants.PRODUCT_CAROUSEL_FAIL:
      return {
        laoding: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const productUpdateCarouselReducer = (
  state = { product: {} },
  action
) => {
  switch (action.type) {
    case productContants.PRODUCT_UPDATE_CAROUSEL_REQUEST:
      return {
        loading: true,
        success: false,
      }
    case productContants.PRODUCT_UPDATE_CAROUSEL_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        success: true,
      }
    case productContants.PRODUCT_UPDATE_CAROUSEL_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      }
    case productContants.PRODUCT_UPDATE_CAROUSEL_RESET:
      return {
        loading: false,
        product: {},
        success: false,
      }
    default:
      return state
  }
}

export const productCurrUserReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case productContants.PRODUCT_CURR_USER_REVIEW_REQUEST:
      return {
        loading: true,
        success: false,
      }
    case productContants.PRODUCT_CURR_USER_REVIEW_SUCCESS:
      return {
        loading: false,
        myreview: action.payload,
        success: true,
      }
    case productContants.PRODUCT_CURR_USER_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      }
    case productContants.PRODUCT_CURR_USER_REVIEW_RESET:
      return {}
    default:
      return state
  }
}
