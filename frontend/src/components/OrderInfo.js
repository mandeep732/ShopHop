import React from 'react'
import {
  Button,
  Row,
  Col,
  ListGroup,
  Card,
  Image,
  Badge,
  Accordion,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import DateFormat from './DateFormat'
import PriceTag from './PriceTag'

const OrderInfo = ({ order, isAdmin = false, user = {} }) => {
  return (
    <Card border="primary">
      <Card.Header>
        <Row>
          <Col md={8}>
            <Row>
              <Col className="bold-arial">Ordered Id #{order._id}</Col>
            </Row>
            <Row>
              <Col>
                {' '}
                Ordered On{' '}
                <DateFormat utc={order.createdAt} type="date-short" />
              </Col>
            </Row>
            <Row>
              <Col> Total Items : {order.orderItems.length}</Col>
            </Row>
            {isAdmin && user && (
              <Row>
                <Col>
                  <Row>
                    <Col className="bold">Ordered By {user.name}</Col>
                  </Row>
                  <Row>
                    <Col className="bold-arial">User Id #{user._id}</Col>
                  </Row>{' '}
                </Col>
              </Row>
            )}
          </Col>
          <Col md={4}>
            <Row>
              <Col>
                <Row>
                  <Col md={12}>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="dark" block>
                        Details
                      </Button>
                    </LinkContainer>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {order.isPaid ? (
                      <Badge
                        variant="success"
                        className="rounded mb-0  my-1 px-3 py-2"
                      >
                        Paid
                      </Badge>
                    ) : (
                      <Badge
                        variant="info"
                        className="rounded mb-0  my-1 px-3 py-2"
                      >
                        Not Paid
                      </Badge>
                    )}
                  </Col>
                  <Col>
                    {order.isDelivered ? (
                      <Badge
                        variant="success"
                        className="rounded mb-0  my-1 px-4 py-2"
                      >
                        Delivered
                      </Badge>
                    ) : (
                      <Badge
                        variant="info"
                        className="rounded mb-0  my-1 px-3 py-2"
                      >
                        Not Delivered
                      </Badge>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Title>
          Total Amount : <PriceTag price={order.totalPrice} />{' '}
        </Card.Title>
        <ListGroup variant="flash">
          {order.orderItems.map((item, index) => {
            switch (index) {
              case 0:
              case 1:
                return (
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={1} lg={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Row>
                          <Col>{item.name}</Col>
                        </Row>
                        <Row>
                          <Col>
                            <PriceTag price={item.price} />
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
          {order.orderItems.length >= 3 && (
            <Accordion>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  More Items
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body className="px-0 py-0">
                    {order.orderItems.map(
                      (item, index) =>
                        index > 1 && (
                          <ListGroup.Item key={item._id}>
                            <Row>
                              <Col md={1} lg={1}>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fluid
                                  rounded
                                />
                              </Col>
                              <Col>
                                <Row>
                                  <Col>{item.name}</Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <PriceTag price={item.price} />
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        )
                    )}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default OrderInfo
