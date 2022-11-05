import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Row,Col,Form,Button,Card,Image,ListGroup, ListGroupItem} from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartAction';
import { useParams,useNavigate ,useLocation } from 'react-router';
import {Link} from 'react-router-dom';


const CartScreen = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchParams = new URLSearchParams(location.search);
    const qty=searchParams.get('qty')?searchParams.get('qty'):1
  
    useEffect(() => {
        if(id){
           dispatch(addToCart(id,qty))
      }  
    },[dispatch,id,qty])
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart;

  const removeFromCartHandler = (_id) => {
    console.log(_id,'ttttttttttttt')
    if (_id) {
      dispatch(removeFromCart(_id,qty))
    }
  }

  const checkout = () => {
    navigate('/login?redirect=shipping')
  }

  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {
            cartItems.length === 0 ? (
              <h3>Your cart is empty 
                &nbsp; <Link to='/'>Go Back</Link>
              </h3>
            ) : (
                <ListGroup variant='flush'>
                  {
                    cartItems && cartItems.map(item => {
                      return (<ListGroupItem>
                        <Row>
                          <Col md={3}>
                          <Link to={`/product/${item.product}`} style={{textDecoration:"none"}}><Image src={item && item.image} alt={item.name} fluid rounded/></Link>
                            
                          </Col>
                          <Col md={3}>
                            <Link to={`/product/${item.product}`} style={{textDecoration:"none"}}>{item && item.name}</Link>
                          </Col>
                          <Col md={2}>
                           Price : ${+item.price * +item.qty}
                          </Col>
                          <Col md={2}>
                            
                          <Form.Control as='Select'  value={item.qty} onChange={(e)=>dispatch(addToCart(item.product,+(e.target.value)))}>
                                          {
                                [...Array(item.countInStock).keys()].map(x => { return <option key={x + 1} value={x + 1}>{x+1}</option>}
                                         
                                              )
                                          }
                            </Form.Control>
                            
                          </Col>
                          <Col md={1}>
                            <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                              <i className='fa fa-trash' aria-hidden='false'></i>
                            </Button>
                          </Col>
                          
                        </Row>
                      </ListGroupItem>)
                    })
                    
               }
                </ListGroup>
            )
          }
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
            <ListGroupItem>
                                <h3>Total Products : <span>({cartItems.reduce((acc,item)=>acc+ +item.qty ,0)})</span> </h3>
              </ListGroupItem>
              <ListGroupItem>
                Total Amount : ${cartItems.reduce((acc,item)=>acc + (+item.qty * +item.price),0).toFixed(2)}
              </ListGroupItem>
              <Button style={{background:'green'}} type='button' className='btn-block' disabled={cartItems.length===0} onClick={checkout}>
                 Proceed to checkout &nbsp; <i class="fa-solid fa-arrow-right"></i>
              </Button>
            </ListGroup>
                             
                            </Card>
                          </Col>
      </Row>
    </>
  )
}

export default CartScreen