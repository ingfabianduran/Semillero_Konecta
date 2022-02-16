import { configAxios as axios } from '../axios';

const getPersonajes = async(url) => {
  try {
    const resPersonajes = await axios({ method: 'GET', url: url });
    const dataPersonajes = await resPersonajes.data;
    return dataPersonajes;
  } catch (error) {
    console.log('Get Personajes', error);
  }
};

export { getPersonajes };