import axios from "axios";
import {
    API_URL,getToken
} from "../request";

import { CREATE_ORDER_FAIL, CREATE_ORDER_SUCCESS, CREATE_ORDER_REQUEST,PLACE_ORDER_SUCCESS } from "../constants/orderConstants";

export const createOrder = async(order)  => {
  
    try {
       
        const {
            data
        } = await axios.post(`${API_URL}/placeOrder`,order,
            getToken());
        return data
    } catch (err) {
        throw err
    }
}

export const placeOrder = (data) => async(dispatch, getState) => {
    getState().cart.paymentMethod = data
    

    dispatch({
        type: PLACE_ORDER_SUCCESS,
        payload:getState().cart
    })
    localStorage.setItem('paymentMethod',JSON.stringify(data))
}