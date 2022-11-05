
import './App.css';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Footer from './components/footer'
import Header from './components/Header'
import HomeScreen from './screens/homeScreen';
import CartScreen from './screens/cartScreen';
import ProductDetails from './screens/productDetails';

function App() {
  return (
    <Router>
      <Header/>
      <main className='my-3'>
      <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path='/product/:id' element={<ProductDetails />} exact />
            <Route path='/cart/:id' element={<CartScreen />} exact/>
            <Route path='/cart' element={<CartScreen /> } exact/>
          </Routes>
          
      </Container>
      </main>
      
      <Footer/>
    </Router>
  );
}

export default App;
