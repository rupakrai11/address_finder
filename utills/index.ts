import axios from "axios";

const axiosClient = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "auth-key": "872608e3-4530-4c6a-a369-052accb03ca8",
  },
});

export default axiosClient;
