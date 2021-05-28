import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Rating = ({
  rating,
  totalReviews = 0,
  onlyRating = false,
  onlyStar = false,
  wrtieReview = false,
  color = '#f8e825',
}) => {
  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  }
  return (
    <>
      <div className="rating">
        <span>
          <i
            style={{ color }}
            className={
              rating >= 1
                ? 'fas fa-star fa-lg'
                : rating >= 0.5
                ? 'fas fa-star-half-alt fa-lg'
                : 'far fa-star fa-lg '
            }
          ></i>
        </span>
        <span>
          <i
            style={{ color }}
            className={
              rating >= 2
                ? 'fas fa-star fa-lg'
                : rating >= 1.5
                ? 'fas fa-star-half-alt fa-lg'
                : 'far fa-star fa-lg '
            }
          ></i>
        </span>

        <span>
          <i
            style={{ color }}
            className={
              rating >= 3
                ? 'fas fa-star fa-lg'
                : rating >= 2.5
                ? 'fas fa-star-half-alt fa-lg'
                : 'far fa-star fa-lg '
            }
          ></i>
        </span>

        <span>
          <i
            style={{ color }}
            className={
              rating >= 4
                ? 'fas fa-star fa-lg'
                : rating >= 3.5
                ? 'fas fa-star-half-alt fa-lg'
                : 'far fa-star fa-lg '
            }
          ></i>
        </span>

        <span>
          <i
            style={{ color }}
            className={
              rating >= 5
                ? 'fas fa-star fa-lg'
                : rating >= 4.5
                ? 'fas fa-star-half-alt fa-lg'
                : 'far fa-star fa-lg '
            }
          ></i>
        </span>
      </div>
      {wrtieReview && (
        <div ml={2} className="bold">
          {labels[rating]}
        </div>
      )}

      {!onlyStar && (
        <div>
          {totalReviews === 0
            ? ''
            : onlyRating
            ? `${rating} rating out of 5`
            : `${rating} ratings and ${totalReviews} reviews`}
        </div>
      )}
    </>
  )
}

Rating.defaultProps = {
  color: '#f8e825',
}

export default Rating
