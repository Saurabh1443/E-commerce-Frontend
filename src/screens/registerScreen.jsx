import React,{useState,useEffect} from "react";
import {Link, useNavigate,useLocation } from 'react-router-dom'
import { Form, Button, Row, Col,Alert } from "react-bootstrap";
import Loader from '../components/shared/Loader'
import { register } from "../actions/userAction";
import FormContainer from "../components/shared/formContainer";
import { useDispatch, useSelector } from "react-redux";


const RegisterScreen = () => {
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const[message,setMessage]=useState('')
    const [show, setShow] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister
    const searchParams = new URLSearchParams(location.search);
    const redirect=searchParams.get('redirect')?searchParams.get('redirect'):'/'

     
    const submitHandler = (e) => {
        console.log(e)
        e.preventDefault();
          if (password!==confirmPassword) {
            setMessage("Password and confirm password not matched")
            setShow(true) 
            }
         else {
            dispatch(register(email,password,name))
        }
           
       }
    useEffect(() => {
        
        if (userInfo){navigate(redirect)}
        else {
            if (error) {
                console.log('error')
                setMessage(error.message)
                setShow(true)
            }
        }
    },[userInfo,error,loading])

    return (
        <>
           { <Alert show={show} onClose={()=>setShow(false)} variant='warning' dismissible>
                <h3>{message}</h3>
            </Alert>}
            <FormContainer>
                <h1>User Registration</h1>
                {loading&&<Loader />}
                <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                        <Form.Label>Name </Form.Label>
                        <Form.Control type="text" required placeholder="enter name" value={name} onChange={e => {setName(e.target.value)}}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" required placeholder="enter email" value={email} onChange={e => {  setEmail(e.target.value)}}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                         <Form.Control type="password" required placeholder="enter password" value={password} onChange={e=>{setPassword(e.target.value)}}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                         <Form.Control type="password" required placeholder="enter password" value={confirmPassword} onChange={e=>{setConfirmPassword(e.target.value)}}></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Register</Button>

                </Form>
                <Row>
                    <Col>
                        Already Registered ?
                        <Link to={redirect?`/login?redirect=${redirect}`:'/login'}>Login</Link>
                    </Col>
                </Row>
            </FormContainer>
         
        </>
    )
}
export default RegisterScreen