import React from 'react'
import {Navbar,Nav,Container, NavDropdown, Form} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
  import { useDispatch,useSelector } from 'react-redux'
import { logout } from '../actions/userAction'
const Header = () => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const logoutHandler = () => {
     dispatch(logout())
   }

  return (
      <>
          <Navbar bg="dark" style={{height:'60px'}}  expand="sm" variant="dark" collapseOnSelect={true}>
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand >ONLINE SHOP</Navbar.Brand>
          </LinkContainer>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Form>
              <Form.Group controlId='product'>
                        <Form.Control onChange={(e)=>console.log(e.target.value,'ddddd')} style={{borderRadius:"15px",padding:'10px'}} type="text" placeholder="Search Products"  ></Form.Control>
                    </Form.Group>
              </Form>
           
            <LinkContainer to='/'>
              <Nav.Link >
              <i class="fa-sharp fa-solid fa-house-user"></i>
                &nbsp; Home
              </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/about'>
              <Nav.Link >
              <i class="fa-solid fa-address-card"></i>
                &nbsp; About
              </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/cart'>
              <Nav.Link >
                              <i className="fa-solid fa-cart-arrow-down"></i>
                &nbsp; Cart
              </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/myOrders'>
              <Nav.Link >
              <i class="fa-solid fa-box-archive"></i>
                &nbsp; My Orders
              </Nav.Link>
              </LinkContainer>
              {
                userInfo ? (
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to={`/profile`}>
                      <NavDropdown.Item>
                        Profile
                      </NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    
                  </NavDropdown>
                ) : (
                  <LinkContainer to='/login'>
                  <Nav.Link >
                              <i className="fa-solid fa-user"></i>&nbsp; SignIn
                  </Nav.Link>
                  </LinkContainer>
                )
              }
              
                          
         
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar></>
  )
}

export default Header