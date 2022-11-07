import React,{useEffect, useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from '../components/shared/formContainer'
import { addShippingAddress } from '../actions/cartAction'
import { Link, Navigate, useNavigate } from 'react-router-dom'


const ShippingAddressScreen = () => {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {shippingAddress}= cart
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addShippingAddress({address, city, postalCode, country}))
        navigate('/payment')
   }

  return (
      <FormContainer>
         
          <h1>Shipping Address</h1>
          <Form onSubmit={submitHandler} >
          <Form.Group controlId='address'>
                        <Form.Label>Address Line 1 :</Form.Label>
                        <Form.Control type="text" placeholder="enter address" value={address} onChange={e => { setAddress(e.target.value)}} required></Form.Control>
              </Form.Group>
              <Form.Group controlId='postalCode'>
                        <Form.Label>Postal Code :</Form.Label>
                        <Form.Control required type="text" placeholder="enter Postal code" value={postalCode} onChange={e => { setPostalCode(e.target.value)}}></Form.Control>
              </Form.Group>
              <Form.Group controlId='city'>
                        <Form.Label>City :</Form.Label>
                        <Form.Control required type="text" placeholder="enter city" value={city} onChange={e => { setCity(e.target.value)}}></Form.Control>
              </Form.Group>
              <Form.Group controlId='country'>
                        <Form.Label>Country :</Form.Label>
                        <Form.Control required type="text" placeholder="enter country" value={country} onChange={e => { setCountry(e.target.value)}}></Form.Control>
              </Form.Group>
              <br />
              <Button type='submit' variant='primary'>Continue</Button>
          </Form>
   </FormContainer>
  )
}

export default ShippingAddressScreen