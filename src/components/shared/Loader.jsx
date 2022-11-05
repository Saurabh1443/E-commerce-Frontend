import React from 'react'
import {Spinner} from 'react-bootstrap'
const Loader = () => {
    return (
        <>
          <div style={{color:"green",fontSize:"80px"}}>Loading...</div>
            <Spinner animation="border" variant="success"  style={{width:'100px',height:'100px',margin:'auto',display:'block'}}>
    
    </Spinner>
      </>
    
  )
}

export default Loader