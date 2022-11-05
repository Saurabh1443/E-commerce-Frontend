import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
} from '../constants/productCostants'
import axios from 'axios'
import {
    API_URL
} from '../request';

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST
        })
        const {
            data
        } = await axios.get(`${API_URL}/products`);

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data.data
        })

    } catch (err) {

        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: err
        })
        console.log(err);
    }
}