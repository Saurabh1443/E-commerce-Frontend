import React, {useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {listProducts} from '../actions/productActions'
import Loader from '../components/shared/Loader'
import Message from '../components/shared/Message'
import ProductScreen from './productScreen'
import { Row, Col,Card } from 'react-bootstrap'

const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state =>  state.productList);
   
    const {loading,error,products} = productList
    useEffect(() => {
        dispatch(listProducts())
    }, [])
    
    const electronicProducts = products? products.filter(vv => vv.category === 'Electronics'):[];
    const footwearProducts = products? products.filter(vv => vv.category === 'Footwear'):[];
  return (
      <>
          {
              loading ? <Loader /> : error ? <Message variant={'danger'} msg={error} /> :<>
                  <Card style={{backgroundColor:"rgba(255, 0, 0, 0.558)"}}>
                  <Row>
                  <h2 > <span style={{color:"#FF9900"}}>Category :</span> <span style={{color:"green"}}>Electronics</span> </h2>
                  {
                      
                  electronicProducts&&electronicProducts.map((product, index) => {
                    
                      return (
                          <Col key={index} sm={3} >
                     <ProductScreen Product={product} />
                          </Col>
                      )
                      
                  })
              }
                  </Row>
                </Card>
                  <Card  style={{marginTop:"50px",backgroundColor:"cyan"}}>
                  <Row>
                  <h2 > <span style={{color:"#FF9900"}}>Category :</span> <span style={{color:"green"}}>Footwears</span> </h2>
                  {
                      
                  footwearProducts&&footwearProducts.map((product, index) => {
                    
                      return (
                          <Col key={index} sm={3} >
                     <ProductScreen Product={product} />
                          </Col>
                      )
                      
                  })
              }
                  </Row>
                 </Card>
                  </>
                
         }
          
    </>
  )
}

export default HomeScreen