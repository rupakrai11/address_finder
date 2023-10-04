import axios from "axios"

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API,
  headers: {
    "auth-key":process.env.NEXT_PUBLIC_REST_API_KEY,
  }
})


export default axiosClient