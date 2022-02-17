import { configAxios as axios } from './axios';
import { toast } from 'react-toastify';

const getData = async(url) => {
  try {
    const res = await axios({ method: 'GET', url: url });
    const resData = await res.data;
    return resData;
  } catch (error) {
    toast.error(error);
  }
};

export { getData };