import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS
} from "../constants/cartConstants";
import axios from "axios";
import {
    API_URL
} from "../request";


export const addToCart = (id, qty) => async (dispatch, getState) => {
    const {
        data
    } = await axios.get(`${API_URL}/product/${id}`);

    const {
        doc
    } = data
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: doc._id,
            name: doc.name,
            image: doc.image,
            price: doc.price,
            countInStock: doc.countInStock,
            qty
        }

    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
export const removeFromCart = (id, qty) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: {
            product: id
        }
    })
    
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const addShippingAddress = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload:data
    })
    localStorage.setItem('shippingAddress',JSON.stringify(data))
}

export const deleteCart = () => async (dispatch) => {
    dispatch({
        type: "DELETE_CART",
        
    })
    
}