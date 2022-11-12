import React from 'react'
import { Card ,Image} from 'react-bootstrap'
import Rating from '../components/Rating'
import {Link} from 'react-router-dom'
import './productScreen.css'


const ProductScreen = ({Product}) => {
  return (
      <div className="effect">
          <Card style={{height:"fit-content",width:"300px"}} className='my-2 p-2 rounded effect' >
              <Link to={`./product/${Product._id}`}>
                  <Image style={{height:'130px',width:"160px"}} src={Product.image}  />
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
                  <Card.Text >
                      <div >
                         $ {Product.price} 
                      </div>
                  </Card.Text>
              </Card.Body>
          </Card>
      </div>
  )
}

export default ProductScreen