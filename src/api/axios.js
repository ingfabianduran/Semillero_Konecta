import axios from 'axios';

const configAxios = axios.create({
  baseURL: 'https://www.breakingbadapi.com/api/characters'
});

export { configAxios };