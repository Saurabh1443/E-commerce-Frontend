import React,{useState,useEffect} from "react";
import {Link, useNavigate,useParams} from 'react-router-dom'
import { Form, Button, Row, Col, Table, ListGroup, ListGroupItem, Card } from "react-bootstrap";
import Loader from '../components/shared/Loader'
import { profileDetails,updateUserDetails } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";


const ProfileScreen = () => {
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const[message,setMessage]=useState('')
    const [show, setShow] = useState(false)


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userDetails,userLogin} = useSelector(state => state)
    const { loading, error, user} = userDetails
    const { userInfo } = userLogin
    

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {

            if (!user) {
                dispatch(profileDetails(userInfo._id))
            } else {
                setName(userInfo.name);
                setEmail(userInfo.email);
            }
        }
    }, [user])
    
  const submitHandler = (e) => {
    window.stop();
      console.log(e)
      e.preventDEfault();
      // dispatch(updateUserDetails(userInfo._id, name));
    }

    return (
        <>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        
          <div >
          <h3>Edit Profile</h3>
            
              <Form onSubmit={submitHandler}>
              <Form.Group controlId="email">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="enter email"
                  value={email}
                  disabled={true}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button style={{ marginTop: '10px' }} onClick={() => { window.stop(); console.log('clicked')}} className="btn-block" type="submit" variant="success">
                Update
              </Button>
            </Form>
             
          </div>
          <div>
          <Button onClick={()=>navigate('/myOrders')} variant='warning' style={{borderRadius:"10px"}}>
                  My Orders
            </Button>&nbsp;
            <Button onClick={()=>navigate('/cart')} variant='warning' style={{borderRadius:"10px"}}>
                  My Wishlist
                </Button>
           
              
            </div>
        </div>
      </>
    )
}
export default ProfileScreen