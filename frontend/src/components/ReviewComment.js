import React, { useState } from 'react'
import {
  Table,
  Form,
  Button,
  Row,
  Col,
  ListGroup,
  Card,
  Container,
  Image,
  Badge,
  Accordion,
  Alert,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import DateFormat from './DateFormat'
import Message from './Message'
import PriceTag from './PriceTag'
import Rating from '../components/Rating'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle'

const ReviewComment = ({ reviews, numReviews }) => {
  const [lessAccordion, setLessAccordion] = useState(false)
  return (
    <>
      <ListGroup variant="flash">
        {reviews
          .sort((a, b) => {
            var keyA = new Date(a.createdAt),
              keyB = new Date(b.createdAt)
            if (keyA < keyB) return 1
            if (keyA > keyB) return -1
            return 0
          })
          .map((review, index) => {
            switch (index) {
              case 0:
              case 1:
                return (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col>
                        <Row>
                          <Col className="d-flex justify-content-end">
                            {review.createdAt && (
                              <div className="bold">
                                {' '}
                                <DateFormat
                                  utc={review.createdAt}
                                  type="date-time-sameline"
                                />
                              </div>
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <strong className="bold">{review.name}</strong>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Rating
                              rating={
                                review.rating === undefined ? 0 : review.rating
                              }
                              totalReviews={
                                numReviews === undefined ? 0 : numReviews
                              }
                              onlyStar={true}
                              reviewStar={true}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <p>{review.comment && review.comment}</p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )
              default:
                return
            }
          })}
        {reviews.length >= 3 && (
          <Accordion>
            <Card>
              <Accordion.Toggle
                as={Card.Header}
                eventKey="1"
                onClick={() => {
                  if (lessAccordion) {
                    setLessAccordion(false)
                  } else setLessAccordion(true)
                }}
              >
                More Reviews
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body className="px-0 py-0">
                  {reviews
                    .sort((a, b) => {
                      var keyA = new Date(a.createdAt),
                        keyB = new Date(b.createdAt)
                      if (keyA < keyB) return 1
                      if (keyA > keyB) return -1
                      return 0
                    })
                    .map(
                      (review, index) =>
                        index > 1 && (
                          <div key={index}>
                            <ListGroup.Item>
                              <Row>
                                <Col>
                                  <Row>
                                    <Col className="d-flex justify-content-end">
                                      {review.createdAt && (
                                        <div className="bold">
                                          {' '}
                                          <DateFormat
                                            utc={review.createdAt}
                                            type="date-time-sameline"
                                          />
                                        </div>
                                      )}
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <strong className="bold">
                                        {review.name}
                                      </strong>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <Rating
                                        rating={
                                          review.rating === undefined
                                            ? 0
                                            : review.rating
                                        }
                                        totalReviews={
                                          numReviews === undefined
                                            ? 0
                                            : numReviews
                                        }
                                        onlyStar={true}
                                        reviewStar={true}
                                      />
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <p>{review.comment && review.comment}</p>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          </div>
                        )
                    )}
                </Card.Body>
              </Accordion.Collapse>
              {lessAccordion && (
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="1"
                  onClick={() => {
                    setLessAccordion(false)
                  }}
                >
                  Less Reviews
                </Accordion.Toggle>
              )}
            </Card>
          </Accordion>
        )}
      </ListGroup>
    </>
  )
}

export default ReviewComment
