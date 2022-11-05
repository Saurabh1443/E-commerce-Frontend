import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from '../components/Rating'
import {Link} from 'react-router-dom'
import './productScreen.css'


const ProductScreen = ({Product}) => {
  return (
      <div className="effect">
          <Card className='my-2 p-2 rounded effect' >
              <Link to={`./product/${Product._id}`}>
                  <Card.Img src={Product.image} variant='top' />
              </Link>
              <Card.Body>
                  <Link to={`/product/${Product._id}`} style={{textDecoration:"none"}}>
                      <Card.Title as='div'>
                          <strong>{Product.name}</strong>
                      </Card.Title>
                  </Link>
                  <Card.Text as='div'>
                      <div className='my-3'>
                          <Rating value={Product.rating} total={Product.numReviews}/>
                      </div>
                  </Card.Text>
                  <Card.Text as='div'>
                      <div className='my-3'>
                         $ {Product.price} 
                      </div>
                  </Card.Text>
              </Card.Body>
          </Card>
      </div>
  )
}

export default ProductScreen