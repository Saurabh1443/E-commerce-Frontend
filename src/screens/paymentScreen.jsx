import React from 'react'
import { useState } from 'react'
import { Form,Button,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethods } from '../actions/cartAction'


function PaymentScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    if (!shippingAddress) {
        navigate('/shipping')
    }
    const [paymentMethod, setPaymentMethod] = useState('paypal')
    
    const submitHandler = (e) => {
        dispatch(savePaymentMethods(paymentMethod));
        navigate('/placeOrder')
    }

  return (
      <>
          <h1>Payment Details </h1>
          <Form onSubmit={submitHandler}>
              <Form.Group>
                  <Form.Label as='legend'>
                      Select Payment Method
                  </Form.Label>
                  <Col>
                      <Form.Check type='radio' label='Paypal or Credit Card' id='paypal' name='paymentMethod' value='paypal' checked onChange={e => setPaymentMethod(e.target.value)}></Form.Check>
                      <Form.Check type='radio' label='Strip' id='strip' checked name='paymentMethod' value='stripe' onChange={e => setPaymentMethod(e.target.value)}></Form.Check>
                  </Col>
              </Form.Group>
              <Button type='submit' variant='primary'>Continue</Button>
          </Form>
      </>
  )
}

export default PaymentScreen