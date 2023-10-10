import axios from "axios";

const axiosClient = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "auth-key": process.env.NEXT_PUBLIC_REST_API_KEY,
  },
});

export default axiosClient;


