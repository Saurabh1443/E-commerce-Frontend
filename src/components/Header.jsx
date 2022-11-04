import React from 'react'
import {Navbar,Nav,Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
const Header = () => {
  return (
      <>
          <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect={true}>
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand >ONLINE SHOP</Navbar.Brand>
          </LinkContainer>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="ml-auto">
              <LinkContainer to='/cart'>
              <Nav.Link >
                              <i className="fa-solid fa-cart-arrow-down"></i>
                &nbsp; cart
              </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/signIn'>
              <Nav.Link >
                          <i className="fa-solid fa-user"></i> SignIn
                          </Nav.Link>
              </LinkContainer>
                          
         
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar></>
  )
}

export default Header