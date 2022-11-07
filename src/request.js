export const API_URL = 'http://localhost:8080'
export const getToken = () => {

    return {
        headers: {
            'Content-Type':'application/json',
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).token
        }
    }
}