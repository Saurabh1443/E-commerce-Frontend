import { CREATE_ORDER_FAIL, CREATE_ORDER_SUCCESS, CREATE_ORDER_REQUEST, PLACE_ORDER_SUCCESS } from "../constants/orderConstants";


export const orderReducer = (state={},action) => {
    try {
        switch (action.type) {
            case CREATE_ORDER_REQUEST:
                return { loading: true }
            case CREATE_ORDER_SUCCESS:
                return { loading: false, order: action.payload }
            case CREATE_ORDER_FAIL:
                return { loading: false, error: action.payload }
            case PLACE_ORDER_SUCCESS:
                return { loading: false, order:action.payload }
            default:
                return state
        }
    } catch (err) {
        console.log(err);
    }
}