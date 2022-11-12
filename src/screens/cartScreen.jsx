import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Row,Col,Form,Button,Card,Image,ListGroup, ListGroupItem} from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartAction';
import { useParams,useNavigate ,useLocation } from 'react-router';
import {Link} from 'react-router-dom';
import Previous from '../components/previous';
import axios from 'axios';
import { API_URL, getToken } from '../request';


const CartScreen = () => {

  const [cartItems,setCartItems] = useState([])
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
  const dispatch = useDispatch();
  
    const searchParams = new URLSearchParams(location.search);
    const qty=searchParams.get('qty')?searchParams.get('qty'):1

  const { userLogin } = useSelector(state => state)
  

  const fetchCartDetails = async () => {
    const {data:{result}} =await axios.get(`${API_URL}/getCartItems`, { params: { User: userLogin.userInfo._id }, ...getToken() })
    setCartItems(result)
   
    
  }

  useEffect(() => {
   
    fetchCartDetails();
   
  }, [id])
  
  const updateQuantity = async (productId,Qty) => {
    const { result } = await axios.put(`${API_URL}/updateQty`, { User: userLogin.userInfo._id, productId: productId, Qty: Qty })
    fetchCartDetails()
  }

  const removeFromCartHandler = async(productId) => {
    const { result } = await axios.put(`${API_URL}/removeFromCart`, { User: userLogin.userInfo._id, productId: productId })
    fetchCartDetails()
  }
  const checkout = () => {
 
    if (userLogin&&userLogin.token) {
      navigate('/shipping')
    } else {
      navigate('/login/?redirect=/shipping')
     }
    
  }
  
  return (
    <>
      <Previous>Shopping Cart</Previous>
      <Row>
        <Col md={8}>
          
          {
            !cartItems||cartItems.length === 0 ? (
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
                           Price : ${ Math.round(+item.price * item.Qty).toFixed(2)}
                          </Col>
                          <Col md={2}>
                            Quantity : 
                          <Form.Control as='Select' value={item.Qty} onChange={(e)=>updateQuantity(item._id,+(e.target.value))}>
                                          {
                                [...Array(item.countInStock).keys()].map(x => { return <option key={x + 1} value={x + 1}>{x+1}</option>}
                                         
                                              )
                                          }
                            </Form.Control>
                            
                          </Col>
                          <Col md={1}>
                            <Button type='button' variant='light' onClick={() => {  removeFromCartHandler(item._id)}}>
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
                                <h3>Total Products : <span>({cartItems&&cartItems.reduce((acc,item)=>acc+ +item.Qty ,0)})</span> </h3>
              </ListGroupItem>
              <ListGroupItem>
                Total Amount : ${cartItems&&cartItems.reduce((acc,item)=>acc + (+item.Qty * +item.price),0).toFixed(2)}
              </ListGroupItem>
              <Button style={{background:'green'}} type='button' className='btn-block' disabled={!cartItems||cartItems.length===0} onClick={checkout}>
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