import React from 'react'
import {Card,Navbar} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Previous = ({ children }) => {
    const navigate=useNavigate()
  return (
      <>
          <Navbar bg="success" expand="lg" style={{height:'60px',borderRadius:'20px',marginLeft:'-80px',marginTop:'-15px',marginBottom:"15px"}}>
          
              <span style={{fontSize:'22px'}}>
                 &nbsp; <i class="fa-solid fa-arrow-left-long pointer" onClick={()=>navigate(-1)} /> &nbsp; <span >{children}</span>
              </span> 
          
          </Navbar>
        
      </>
  )
}

export default Previous