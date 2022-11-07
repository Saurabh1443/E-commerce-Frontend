import axios from 'axios';
import React from 'react'
import { useEffect,useState } from 'react';
import { Row, Col, Form, Button, Image, ListGroup, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate,useParams} from 'react-router-dom';
import { API_URL, getToken } from '../request';
import moment from 'moment'


const OrderDetailsScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id1,id2 } = useParams()
    const [individualOrder, setIndividualOrder] = useState({});
    const [orderedAt, setOrderedAt] = useState('');
    const [deliveredAt, setDeliveredAt] = useState('');
    useEffect(() => {
        const fetchOrderDetails = async() => {
            const { data: { doc, error, success } } = await axios.get(`${API_URL}/orders/specific`, { params: { id1,id2 } ,...getToken()} );
            if (doc && doc.length && success) {
                setDeliveredAt(doc.deliveredAt);
                setOrderedAt(doc.orderedAt);
                let xx = doc[0].orderItems&&doc[0].orderItems.filter(vv => vv.product === id2)[0];
                xx.brand = xx.name.split(' ')[0];
                setIndividualOrder(xx)
            }

        }
        fetchOrderDetails();
    }, [id1, id2])
    
    const getNoOfDays = () => {
    console.log(moment(deliveredAt).format('l'),'dddddddddd')
        return ((new Date(moment(deliveredAt).format('l')).getTime() - new Date(moment(orderedAt).format('l')).getTime()) / (1000 * 3600 * 24));
    }
   

  return (
      <>
          <Row>
          <ListGroup variant="flush">
            <ListGroup.Item>
                      <h5>Order ID - { id1}</h5>
            </ListGroup.Item>
           
           
              </ListGroup>
          </Row>
          <Row>
          <Col  md={3}
                  >
              <ListGroup>
             
                      <ListGroup.Item>
                 
                   <Link to={`/product/${id2}`} > <Image src={individualOrder.image} alt={individualOrder.name} fluid /></Link> 
        
                      </ListGroup.Item>
                       
                  </ListGroup>
                  </Col> 
              <Col md={5}>
              <ListGroup>
              <Link style={{textDecoration:"none"}} to={`/product/${id2}`} ><ListGroup.Item>
                          <h3>{individualOrder.name}</h3>
                          <h6> Seller: {individualOrder.brand}</h6>
            </ListGroup.Item></Link>
            
                      <ListGroup.Item>Price : ${individualOrder.price}</ListGroup.Item>
                      <ListGroup.Item>Ordered At : {moment(orderedAt).format('llll')}</ListGroup.Item>    
                      <ListGroup.Item>Delivered At : {moment(deliveredAt).format('llll')}</ListGroup.Item> 
                      <ListGroup.Item>
                        Delivered In : {getNoOfDays()} days 
                      </ListGroup.Item>
            <ListGroup.Item style={{color:"green"}}>Note : The Ordered item has been successfully delivered at your door step . Hope to see you soon</ListGroup.Item>
     </ListGroup>
     </Col>
      </Row>
      </>
  )
}

export default OrderDetailsScreen