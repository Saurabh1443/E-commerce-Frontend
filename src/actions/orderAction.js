import axios from "axios";
import {
    API_URL,getToken
} from "../request";

import { CREATE_ORDER_FAIL, CREATE_ORDER_SUCCESS, CREATE_ORDER_REQUEST } from "../constants/orderConstants";


export const createOrder = (order) => async (dispatch, getState) => {

    try {
        dispatch({
            type:CREATE_ORDER_REQUEST,
        })
        
            const {
                data
        } = await axios.post(`${API_URL}/placeOrder`, order, getToken());

            if (data && !data.error) {
                dispatch({
                    type: CREATE_ORDER_SUCCESS,
                    payload: data
                })
            } else {
                dispatch({
                    type: CREATE_ORDER_FAIL,
                    payload:data
                })
            }
           
    } catch (err) {
        err.message = 'unauthorized user'
        
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload:err
        })
    }
}