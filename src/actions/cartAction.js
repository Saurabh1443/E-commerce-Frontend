import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM
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
    console.log(getState().cart.cartItems, 'uuuuuuuuuuuuuuuu')
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}