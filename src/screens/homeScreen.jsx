import React, {useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {listProducts} from '../actions/productActions'
import Loader from '../components/shared/Loader'
import Message from '../components/shared/Message'
import ProductScreen from './productScreen'
import { Row, Col } from 'react-bootstrap'

const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state =>  state.productList);
   
    const {loading,error,products} = productList
    useEffect(() => {
        dispatch(listProducts())
    }, [])
    
    
  return (
      <>
          {
              loading ? <Loader /> : error ? <Message variant={'danger'} msg={error} />: <Row>
              {
                  products&&products.map((product, index) => {
                    
                      return (
                          <Col key={index} sm={3} >
                     <ProductScreen Product={product} />
                          </Col>
                      )
                      
                  })
              }
          </Row>
                
         }
          
    </>
  )
}

export default HomeScreen