import React,{useEffect, useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from '../components/shared/formContainer'
import { addShippingAddress } from '../actions/cartAction'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Previous from '../components/previous'

const ShippingAddressScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
   const [postalCode, setPostalCode] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")

    const submitHandler = (e) => {
        
        e.preventDefault();
        dispatch(addShippingAddress({address, city, postalCode, country,state}))
        navigate('/placeOrder')
   }

    return (
        <>
            <Previous>Add Shipping Address</Previous>
             <FormContainer>
          <Form onSubmit={submitHandler} >
          <Form.Group controlId='address'>
                        <Form.Label>Address Line 1 :</Form.Label>
                        <Form.Control type="text" placeholder="enter address" value={address} onChange={e => { setAddress(e.target.value)}} required></Form.Control>
              </Form.Group>
              <Form.Group controlId='country'>
                        <Form.Label>Country :</Form.Label>
                        <Form.Control required type="text" placeholder="enter country" value={country} onChange={e => { setCountry(e.target.value)}}></Form.Control>
              </Form.Group>
              <Form.Group controlId='state'>
                        <Form.Label>State :</Form.Label>
                        <Form.Control required type="text" placeholder="enter state" value={state} onChange={e => { setState(e.target.value)}}></Form.Control>
              </Form.Group>
              <Form.Group controlId='city'>
                        <Form.Label>City :</Form.Label>
                        <Form.Control required type="text" placeholder="enter city" value={city} onChange={e => { setCity(e.target.value)}}></Form.Control>
              </Form.Group>
             
              <Form.Group controlId='postalCode'>
                        <Form.Label>Postal Code :</Form.Label>
                        <Form.Control required type="text" placeholder="enter Postal code" value={postalCode} onChange={e => { setPostalCode(e.target.value)}}></Form.Control>
              </Form.Group>
              
             
              <br />
              <Button type='submit' variant='success'>Continue &nbsp; <i class="fa-solid fa-arrow-right"></i></Button>
          </Form>
   </FormContainer>
      </>
     
  )
}

export default ShippingAddressScreen