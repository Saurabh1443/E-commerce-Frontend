import React,{useEffect} from 'react'
import { Row, Col, Form, Button, Card, Image, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../actions/orderAction';



const PlaceOrderScreen = () => {
    const {cart,placeOrder} = useSelector(state=>state)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const { order} = placeOrder
    
    const goForOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod:'stripe',
            itemsPrice: cart.itemsPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
            eligibleForFreeShipping: cart.eligibleForFreeShipping,
            shippingPrice:cart.shippingPrice
        }))

    }
   useEffect(() => {
     
    if (order&&order.success) {
        navigate(`/thankYou`);
    } 
   }, [order])
   
    
    const addDecimal = (num) => {
        return Number(num).toFixed(2);
    }
    cart.itemsPrice = addDecimal(cart.cartItems.reduce((acc, item) => acc + (+item.price * +item.qty), 0));
    cart.shippingPrice = addDecimal(cart.itemsPrice > 500 ? 0 : 50)
    cart.taxPrice = addDecimal((0.18 * cart.itemsPrice).toFixed(2))
    cart.totalPrice = addDecimal(+cart.itemsPrice + +cart.shippingPrice + +cart.taxPrice);
    cart.eligibleForFreeShipping= +cart.itemsPrice>500?true:false
  return (
      <>
          <Row>
              <div style={{display:'flex',justifyContent:'space-between'}}>
              <Link to='/' style={{ textDecoration: 'none', color: 'green', paddingBottom: '3px', fontSize: '20px' }}>   <i className="fa-solid fa-arrow-left"></i> Back to home page</Link>
              <Button type='button' variant='warning' style={{padding:'3px'}}  className='mt--2'  onClick={()=>navigate('/cart')}>Add More Items</Button>
              </div>
              
          <Col md={6}>
                  <ListGroup>
                  <ListGroup.Item>
                          <h2>Order Details</h2>
                          {cart && cart.cartItems && cart.cartItems.length > 0 ? (
                              <ListGroup >
                                  {
                                      cart && cart.cartItems.map((item, ind) => {
                                          return (
                                              <ListGroup.Item key={ind + 1}>
                                                  <Row>
                                                      <Col md={3}>
                                                          <Image src={item.image} alt={item.name} fluid/>
                                                      </Col>
                                                      <Col>
                                                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                      </Col>
                                                      <Col md={4}>
                                                          {item.qty} X {item.price} = ${item.qty*item.price}
                                                      </Col>
                                                     
                                                  </Row>
                                              </ListGroup.Item>
                                          )
                                      })
                                  }
                          </ListGroup>
                          ):<h2>No Order Found</h2>
                          }
                          
                         
                      </ListGroup.Item>
                  </ListGroup>
              </Col>
              <Col md={3}>
                  <ListGroup >
                      <ListGroup.Item>
                          <h2>Shipping Address</h2>
                          <p>
                              <strong>
                                  Address Line 1 : 
                              </strong>
                              &nbsp; {cart.shippingAddress.address}
                             
                          </p>
                          <p>
                              <strong>
                                  City : 
                              </strong>
                              {cart.shippingAddress.city}
                             
                          </p>
                          <p>
                              <strong>
                                  Postal Code : 
                              </strong>
                              {cart.shippingAddress.postalCode}
                             
                          </p>
                          <p>
                              <strong>
                                  Country : 
                              </strong>
                              {cart.shippingAddress.country}
                          </p>
                         
                      </ListGroup.Item>
                      <ListGroupItem>
                      <span><h3>Payment Method </h3> : {cart.paymentMethod} </span>
                      </ListGroupItem>
                  </ListGroup>
              </Col>
              <Col md={3}>
              
                  <Card>
                 
                      <ListGroup>
                          <ListGroup.Item>
                              Order Summary
                          </ListGroup.Item>
                          <ListGroup.Item>
                              <Row>
                                  <Col>
                                      Items
                                  </Col>
                                  <Col>$ {cart.itemsPrice}</Col>
                              </Row>
                              <Row>
                                  <Col>
                                      Shipping :
                                  </Col>
                                  <Col>$ {cart.shippingPrice}</Col>
                              </Row>
                              <Row>
                                  <Col>
                                      GST :
                                  </Col>
                                  <Col>$ {cart.taxPrice}</Col>
                              </Row>
                              <Row>
                                  <Col>
                                      Total Price :
                                  </Col>
                                  <Col>${cart.totalPrice}</Col>
                              </Row>
                          </ListGroup.Item>
                          <Button type='button' variant='success' className='btn-block' disabled={!cart.cartItems} onClick={goForOrder}>Place Order </Button>
                      </ListGroup>
                  </Card>
                 
             </Col>
          </Row> 
      </>
  )
}

export default PlaceOrderScreen