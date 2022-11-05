export const API_URL = 'http://localhost:8080'
export const getToken = () => {
    return {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }
}