import axios from "axios";
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL
} from "../constants/userConstants";
import { API_URL,getToken } from "../request";

export const logout = () => dispatch => {
    localStorage.removeItem('userInfo');
    dispatch({
        type:USER_LOGOUT,
    })
}

export const login = (email, password) => async (dispatch) => {
    
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
            localStorage.setItem('userInfo',JSON.stringify(data))
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
export const register = (email, password,name) => async (dispatch) => {
  
    try {
        dispatch({
            type:USER_REGISTER_REQUEST
        })
        const config={headers:{'Content-Type':'application/json'}}
        const { data } = await axios.post(`${API_URL}/register`, { email, password,name }, {
            config
        })
        if (data && !data.error) {
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload:data
            })
            dispatch(login(email,password))
        }
        else {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload:data
            })
        }

        
    } catch (err) {
        console.log(err)
    }
}

export const profileDetails = (id) =>async(dispatch)=>  {
  
    try {
        dispatch({
            type:USER_DETAILS_REQUEST
        })
        const { data } = await axios.get(`${API_URL}/profile/${id}`, getToken());
   console.log(data,'iiiiiiiiiii')
        if (data && !data.error) {
            dispatch({
                type: USER_DETAILS_SUCCESS,
                payload:data
            })
            
        }
        else {
            dispatch({
                type: USER_DETAILS_FAIL,
                payload:data
            })
        }

        
    } catch (err) {
        console.log(err)
    }
}