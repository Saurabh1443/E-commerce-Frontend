import { createStore ,combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer } from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducer'
import { orderReducer } from './reducers/orderReducer'
import { userLoginReducer,userRegisterReducer,userDetailsReducer } from './reducers/userReducer'


const reducer = combineReducers({
    productList: productListReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    placeOrder:orderReducer
});

const cartItemFromStorage = localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
const userItemFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : undefined
const shippingAddressStorage =localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):{}

const initialState = {
    cart: { cartItems: cartItemFromStorage ,shippingAddress:shippingAddressStorage},
    userLogin:userItemFromStorage,
};
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;