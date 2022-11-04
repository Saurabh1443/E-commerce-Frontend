import React, { useState, useEffect } from 'react'
import axios from 'axios';
import products from '../products'
import ProductScreen from './productScreen'
import {Row,Col} from 'react-bootstrap'
const HomeScreen = () => {
  return (
      <>
          <Row>
              {
                  products.map((product, index) => {
                    
                      return (
                          <Col key={index} sm={3} >
                     <ProductScreen Product={product} />
                          </Col>
                      )
                      
                  })
              }
          </Row> 
    </>
  )
}

export default HomeScreen