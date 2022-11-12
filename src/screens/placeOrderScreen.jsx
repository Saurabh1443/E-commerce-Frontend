import React,{useEffect,useState} from 'react'
import { Row, Col, Form, Button, Card, Image, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../actions/orderAction';
import { CREATE_ORDER_FAIL, CREATE_ORDER_SUCCESS } from '../constants/orderConstants';
import Previous from '../components/previous';
import axios from 'axios';
import { API_URL, getToken } from '../request';


const PlaceOrderScreen = () => {
   const [cartItems,setCartItems] = useState([])
    const {cart,userLogin} = useSelector(state=>state)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const fetchCartDetails = async () => {
        const { data: { result } } = await axios.get(`${API_URL}/getCartItems`, { params: { User: userLogin.userInfo._id }, ...getToken() })
        console.log(result,'hhhhhhhhhhhhh')
        setCartItems(result)
        
      }
    useEffect(() => {
        fetchCartDetails()
    },[])
    const goForOrder = async() => {
        const {data,error,success} = await createOrder(({
            orderItems: cartItems,
            shippingAddress: cart.shippingAddress,
            itemsPrice: cart.itemsPrice,
            paymentMethod: "Cash On Delivery",
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
    cart.itemsPrice = addDecimal(cartItems.reduce((acc, item) => acc + (+item.price * +item.Qty), 0));
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
                          
                          {cartItems && cartItems.length > 0 ? (
                              <ListGroup variant='flush' >
                                  {
                                      cartItems.map((item, ind) => {
                                          return (
                                              <ListGroup.Item key={ind + 1}>
                                                  <Row>
                                                      <Col md={3}>
                                                          <Image src={item.image} alt={item.name} fluid/>
                                                      </Col>
                                                      <Col>
                                                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                                                      </Col>
                                                      <Col md={4}>
                                                          {item.Qty} X {item.price} = ${item.Qty*item.price}
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