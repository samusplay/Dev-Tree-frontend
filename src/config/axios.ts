import axios from 'axios'
//Instaciamos un base para construir la solicitud
const api = axios.create({
    //Toma el valor de inicio
    baseURL: import.meta.env.VITE_API_URL
})
export default api