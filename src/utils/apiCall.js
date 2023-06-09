import axios from "axios";
const baseURL = "https://api-pub.bitfinex.com";
export const apiCall = async (method, endpoint, params) => {
  const res = await axios({
    method,
    url: baseURL + endpoint,
    params,
  });
  return res;
};
