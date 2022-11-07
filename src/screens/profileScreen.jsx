import React,{useState,useEffect} from "react";
import {Link, useNavigate,useParams} from 'react-router-dom'
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import Loader from '../components/shared/Loader'
import { profileDetails } from "../actions/userAction";
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
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [userInfo, user, dispatch])
    
    const submitHandler = (e) => {
        e.preventDEfault();
    }

    return (
        <>
        <Row>
          <Col md={3}>
            <h1>Update Information</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="email">
                <Form.Label>Name</Form.Label>
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
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          </Col>
          {/* <Col md={9}>
            <h1>My Orders</h1>
            {loadingOrders ? (
              <Loader />
            ) : errorOrders ? (
              <Message variant="danger">{errorOrders}</Message>
            ) : (
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>DATE</td>
                    <td>TOTAL</td>
                    <td>PAID</td>
                    <td>DELIVERD</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {order.isDeleverd ? (
                          order.deleverdAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button variant="light">Details</Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col> */}
        </Row>
      </>
    )
}
export default ProfileScreen