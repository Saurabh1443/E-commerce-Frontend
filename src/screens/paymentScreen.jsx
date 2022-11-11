import React,{ useState,useEffect  } from 'react'
import { Form,Button,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,useParams } from 'react-router-dom'
import { placeOrder } from '../actions/orderAction'
import axios from 'axios'

function PaymentScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { id } = useParams();
    const {cart,userLogin:{userInfo:email,name}} = useSelector(state => state)
    const { shippingAddress } = cart
    console.log(id)
    if (!(cart&&cart.cartItems.length)) {
        navigate('/shipping')
    }
    const [paymentMethod, setPaymentMethod] = useState(undefined)

    useEffect(() => {
        const checkoutHandler = async (amount) => {

            const { data: { key } } = await axios.get("http://www.localhost:8080/getKey")
       
            const { data: { order } } = await axios.post("http://localhost:8080/checkout", {
                amount
            })
  
            const options = {
                key:key,
                amount: order.amount,
                currency: "INR",
                name: "Domestic Cart",
                description: "e-commerce service",
                
                order_id: order.id,
                callback_url: `http://localhost:8080/paymentVerification/${id}`,
                prefill: {
                    name: name,
                    email: email,
                   
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#51F089"
                }
            };
            const razor = new window.Razorpay(options);
            razor.open();
            
            
        }
        checkoutHandler(500)
    },[id])

  return (
      <>
          <h1>Select Payment Method </h1>

          
      </>
  )
}

export default PaymentScreen