import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const ThankYouScreen = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
           navigate('/myOrders') 
        },7000)
    },[])
  return (
      <div style={{ backgroundImage: "linear-gradient(120deg ,red,blue,green,pink)", width: "100%", height: '80vh',display:'flex',justifyContent:"center",alignItems:"center", }} >
          <div>
          <h1>Thanking You</h1>
              <h2>Your order is placed</h2>
             <h4>redirecting you to my orders page...</h4> 
          </div>

    </div>
  )
}

export default ThankYouScreen