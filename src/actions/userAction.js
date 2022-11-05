import axios from "axios";
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from "../constants/userConstants";
import { API_URL } from "../request";

export const login = (email, password) => async (dispatch) => {
    console.log('login')
    try {
        dispatch({
            type:USER_LOGIN_REQUEST
        })
        const config={headers:{'Content-Type':'application/json'}}
        const { data } = await axios.post(`${API_URL}/login`, { email, password }, {
            config
        })
        if (data && !data.error) {
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload:data
            })
            localStorage.setItem('token',JSON.stringify(data.token))
        }
        else {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload:data
            })
        }

        
    } catch (err) {
        console.log(err)
    }
}