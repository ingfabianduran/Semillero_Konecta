import { configAxios as axios, configAxiosLaravel as axiosB } from './axios';

const getData = async(url) => {
  try {
    const res = await axios({ method: 'GET', url: url });
    const resData = await res.data;
    return resData;
  } catch (error) {
    
  }
};

const apiData = async(method, url, data = {}) => {
  try {
    const res = await axiosB({
      method: method,
      url: url,
      data: data
    });
    const resData = await res.data;
    return resData;
  } catch (error) {
    
  }
};

export { getData, apiData };