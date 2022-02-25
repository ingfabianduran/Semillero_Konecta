import { apiData } from 'api/api';

const getMisPersonajes = async(url) => {
  try {
    const { data, current_page, last_page } = await apiData('GET', url);
    return { data, current_page, last_page };
  } catch (error) {
    
  }
};

const updateCalificacion = async(url, dataCalificacion, actualPage) => {
  try {
    const { message } = await apiData('PUT', url, dataCalificacion);
    const urlAllPersonajes = `personajes/all?page=${actualPage}`;
    const { data } = await apiData('GET', urlAllPersonajes);
    return { data, message };
  } catch (error) {
    
  }
};

const addComentario = async(dataComentario, actualPage) => {
  try {
    const urlAddComentario = 'comentarios/add';
    const { message } = await apiData('POST', urlAddComentario, dataComentario);
    const urlAllPersonajes = `personajes/all?page=${actualPage}`;
    const { data } = await apiData('GET', urlAllPersonajes);
    return { data, message };
  } catch (error) {
    
  }
};

export { getMisPersonajes, updateCalificacion, addComentario };