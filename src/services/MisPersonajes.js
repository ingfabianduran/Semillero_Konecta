import { apiData } from 'api/api';

const getMisPersonajes = async(url) => {
  try {
    const { data, current_page, last_page } = await apiData('GET', url);
    return { data, current_page, last_page };
  } catch (error) {
    
  }
};

const updateCalificacion = async(dataCalificacion, actualPage) => {
  try {
    const { message } = await apiData('POST', 'notas/add', dataCalificacion);
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

const addPersonaje = async(dataPersonaje) => {
  try {
    const urlAddPersonaje = 'personajes/add';
    const headers = { 'Content-Type': 'multipart/form-data' };
    const { message } = await apiData('POST', urlAddPersonaje, dataPersonaje, headers);
    return { message };
  } catch (error) {
    
  }
};

export { getMisPersonajes, updateCalificacion, addComentario, addPersonaje };