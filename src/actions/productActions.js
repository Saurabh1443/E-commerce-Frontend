import {PRODUCT_LIST_FAIL,PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS} from '../constants/productCostants'
import axios from 'axios'

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({
            type:PRODUCT_LIST_REQUEST
        })
        const {data}  = await axios.get('http://localhost:8080/products');
          
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload:data.data
        })
        
    } catch (err) {
        
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:err
        })
        console.log(err);
    }
}