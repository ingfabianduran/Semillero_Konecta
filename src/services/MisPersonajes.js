import { apiData } from 'api/api';

const getMisPersonajes = async(url) => {
  try {
    const { data, current_page, last_page } = await apiData('GET', url);
    return { data, current_page, last_page };
  } catch (error) {
    
  }
};

export { getMisPersonajes };