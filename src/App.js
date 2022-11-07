
import './App.css';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Footer from './components/footer'
import Header from './components/Header'
import HomeScreen from './screens/homeScreen';
import CartScreen from './screens/cartScreen';
import ProductDetails from './screens/productDetails';
import LoginScreen from './screens/loginScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/registerScreen';
import ProfileScreen from './screens/profileScreen';
import ShippingAddressScreen from './screens/shippingAddressScreen';
import PaymentScreen from './screens/paymentScreen';
import PlaceOrderScreen from './screens/placeOrderScreen';
import ThankYouScreen from './screens/thankuScreen';
import MyOrdersScreen from './screens/myOrdersScreen';
import OrderDetailsScreen from './screens/orderDetailsScreen';

function App() {
  const userLogin = useSelector(state => state.userLogin)

  return (
    <Router>
      <Header/>
      <main className='my-3'>
      <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/login" element={<LoginScreen />} exact />
            <Route path="/register" element={<RegisterScreen />} exact />
            <Route path='/profile' element={<ProfileScreen />} exact />
            <Route path='/product/:id' element={<ProductDetails />} exact />
            <Route path='/cart/:id' element={<CartScreen />} exact/>
            <Route path='/cart' element={<CartScreen />} exact />
            <Route path='/shipping' element={<ShippingAddressScreen />} exact />
            <Route path='/payment' element={<PaymentScreen />} exact />
            <Route path='/placeOrder' element={<PlaceOrderScreen />} exact />
            <Route path='/thankYou' element={<ThankYouScreen />} exact />
            <Route path='/myOrders' element={<MyOrdersScreen />} exact />
            <Route path='/order/:id1/:id2' element={<OrderDetailsScreen />} exact />
          </Routes>
          
      </Container>
      </main>
      
      <Footer/>
    </Router>
  );
}

export default App;
