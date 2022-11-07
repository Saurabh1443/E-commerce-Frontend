import axios from 'axios';
import React from 'react'
import { useEffect,useState } from 'react';
import { Row, Col, Form, Button, Image, ListGroup, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL, getToken } from '../request';
import moment from 'moment'

const MyOrdersScreen = () => {
    const {userLogin:{userInfo}} = useSelector(state=>state)
    const dispatch = useDispatch();
    const navigate = useNavigate()
   const [orderDetails,setOrderDetails]=useState([])
    useEffect(() => {

        
        const fetchOrders = async() => {
            const { data:{error,success,doc} } = await axios.get(`${API_URL}/orders`,  {params:{User:userInfo._id}, ...getToken()} )
            
            if (!error && success) {
                setOrderDetails(doc);
            }
        } 
     fetchOrders()   
    },[])
    return (
        <>
             <Row gutter={12}>
             {/* <div style={{display:'flex',justifyContent:'space-between'}}>
              <Link to='/' style={{ textDecoration: 'none', color: 'green', paddingBottom: '3px', fontSize: '20px' }}>   <i className="fa-solid fa-arrow-left"></i> Back to home page</Link>
              
               </div>
               */}
           <Col md={12}>
           
                    <ListGroup variant='flush'>
                    <h3>My Orders : </h3>
                  <ListGroup.Item >

                           {orderDetails && orderDetails.length > 0 ? (
                              <ListGroup variant='flush'>
                                  {
                                        orderDetails && orderDetails.map((item, ind) => item && item.orderItems.map((vv,ind2) => {
                                            return (
                                                <ListGroup.Item action onClick={()=>navigate(`/order/${item._id}/${vv.product}`)} key={ind2 + 1}>
                                                    <Row  >
                                                        <Col md={2}>
                                                            <Image src={vv.image} alt={vv.name} fluid/>
                                                        </Col>
                                                        <Col md={6} style={{width:"35%"}}>
                                                            <h5 style={{paddingBottom:'15px',color:item.isDelivered==true?"green":"#CC9900"}}>{item.isDelivered===true?"Delivered":"Ordered"} on {moment(item.isDelivered===true?item.deliveredAt:item.orderedAt).format('llll') }</h5>
                                                              {vv.name}
                                                        </Col>
                                                        <Col md={2}>
                                                            $ {vv.price}
                                                        </Col>
                                                        <Col md={2}>    
                                                            <Link to={`/order/${item._id}/${vv.product}`} style={{ textDecoration: 'none', color: 'green',  fontSize: '20px' }}><i className="fa-solid fa-arrow-right"></i></Link>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )
                                        })
                                          
                                         
                                      )
                                  }
                          </ListGroup>
                          ):<h2>No Order Found</h2>
                          }
                          
                         
                      </ListGroup.Item>
                  </ListGroup>
              </Col>
            
             
          </Row> 
        </>
    
  )
}

export default MyOrdersScreen