import React,{useEffect} from 'react'
import { Row, Col, Form, Button, Card, Image, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../actions/orderAction';
import { CREATE_ORDER_FAIL, CREATE_ORDER_SUCCESS } from '../constants/orderConstants';
import Previous from '../components/previous';



const PlaceOrderScreen = () => {
    const {cart} = useSelector(state=>state)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    
    
    const goForOrder = async() => {
        const {data,error,success} = await createOrder(({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            itemsPrice: cart.itemsPrice,
            paymentMethod: "paypal",
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
            eligibleForFreeShipping: cart.eligibleForFreeShipping,
            shippingPrice:cart.shippingPrice
        }));
        
        if (!error) {
            dispatch({
                type: CREATE_ORDER_SUCCESS,
                payload:data
            })
            navigate(`/payment/${data._id}`)
        }
        else {
            dispatch({
                type: CREATE_ORDER_FAIL,
                payload:{error,success,data}
            }) 
        }
    }

    
   
    
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
          <Previous>Order Summary</Previous>
          <Row>
              
          <Col md={6}>
                  <ListGroup>
                  <ListGroup.Item>
                          
                          {cart && cart.cartItems && cart.cartItems.length > 0 ? (
                              <ListGroup variant='flush' >
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
                              &nbsp; {cart.shippingAddress&&cart.shippingAddress.address}
                             
                          </p>
                          <p>
                              <strong>
                                  City : 
                              </strong>
                              {cart.shippingAddress&&cart.shippingAddress.city}
                             
                          </p>
                          <p>
                              <strong>
                                  Postal Code : 
                              </strong>
                              {cart.shippingAddress&&cart.shippingAddress.postalCode}
                             
                          </p>
                          <p>
                              <strong>
                                  Country : 
                              </strong>
                              {cart.shippingAddress&&cart.shippingAddress.country}
                          </p>
                         
                      </ListGroup.Item>
                     
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
                          <Button type='button' variant='success' className='btn-block' disabled={!cart.cartItems} onClick={goForOrder}>Continue &nbsp; <i class="fa-solid fa-arrow-right"></i> </Button>
                      </ListGroup>
                  </Card>
                 
             </Col>
          </Row> 
      </>
  )
}

export default PlaceOrderScreen