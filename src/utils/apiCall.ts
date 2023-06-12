import axios from "axios";
const baseURL = "https://api-pub.bitfinex.com";
export const apiCall = async (
  method: string,
  endpoint: string,
  params?: Object
) => {
  const res = await axios({
    method,
    url: baseURL + endpoint,
    params,
  });
  return res;
};
