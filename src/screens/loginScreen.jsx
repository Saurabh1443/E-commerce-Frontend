import React,{useState,useEffect} from "react";
import {Link, useNavigate,useLocation } from 'react-router-dom'
import { Form, Button, Row, Col,Alert } from "react-bootstrap";
import Loader from '../components/shared/Loader'
import { login } from "../actions/userAction";
import FormContainer from "../components/shared/formContainer";
import { useDispatch, useSelector } from "react-redux";


const LoginScreen = () => {
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const[message,setMessage]=useState('')
    const [show, setShow] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin
    const searchParams = new URLSearchParams(location.search);
    const redirect=searchParams.get('redirect')?searchParams.get('redirect'):'/'
console.log(redirect,'iiiiiii')
     
    const submitHandler = (e) => {
        e.preventDefault();
        if (!email) {
            setMessage("Enter email first")
            setShow(true)
            
        }
        else if (!password) {
            setMessage("Enter password first")
            setShow(true)
            
        }
        else {
            
            dispatch(login(email,password))
        }
           
       }
    useEffect(() => {
        if (userInfo){}
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
           { (!email || !password || error)&&<Alert show={show} onClose={()=>setShow(false)} variant='warning' dismissible>
                <h3>{message}</h3>
            </Alert>}
            <FormContainer>
                <h1>SIGN IN</h1>
                {loading&&<Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="enter email" value={email} onChange={e => {setShow(false);  setEmail(e.target.value)}}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                         <Form.Control type="password" placeholder="enter password" value={password} onChange={e=>{setShow(false);setPassword(e.target.value)}}></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>SIGN IN</Button>

                </Form>
                <Row>
                    <Col>
                        New Customer ?
                        <Link to={redirect?`register?redirect=${redirect}`:'/register'}>Register</Link>
                    </Col>
                </Row>
            </FormContainer>
         
        </>
    )
}
export default LoginScreen