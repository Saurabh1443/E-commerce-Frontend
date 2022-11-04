import React from 'react'
import Product from '../products'
import { Row, Col, ListGroup, Button, Image,ListGroupItem } from 'react-bootstrap'
import { useParams } from 'react-router';
import Rating from '../components/Rating';
import {Link } from 'react-router-dom'
const ProductDetails = () => {
    const {id}=useParams()
    const product = Product.find((p) => p._id === id)
    
  return (
      <div>
          <Link className='btn btn-light' to='/' style={{textDecoration:'none'}}><i className='fas fa-arrow-left'/>&nbsp; Go Back</Link>
          <Row>
              <Col md={6} >
                  <Image src={product.image} alt={product.name} fluid/>
              </Col>
              <Col md={3}>
                  <ListGroup variant='flush'>
                      <ListGroupItem>
                          <h3>{product.name}</h3>
                      </ListGroupItem>
                      <ListGroupItem>
                          <h5 >{product.description}</h5>
                      </ListGroupItem>
                      <ListGroupItem>
                          <Rating value={product.rating} total={product.numReviews} />
                      </ListGroupItem>
                      <ListGroupItem>
                        Price : ${product.price}
                      </ListGroupItem>
                  </ListGroup>
              </Col>
              <Col md={3}>
                  <ListGroup>
                  <ListGroupItem variant={product.countInStock<=3? "danger":'success'}>
                      <Row>
                          <Col>Status : </Col>
                          <Col>{product.countInStock>0?"In stock":"Out of stock"}</Col>
                      </Row>
                  </ListGroupItem>
                  <ListGroupItem className="d-grid gap-2">
                      <Button className='btn-block' type='button'>Add To Cart</Button>
                  </ListGroupItem>
                  </ListGroup>
              </Col>
          </Row>
          
      </div>
  )
}

export default ProductDetails