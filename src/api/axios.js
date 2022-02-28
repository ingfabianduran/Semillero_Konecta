import axios from 'axios';

const configAxios = axios.create({
  baseURL: 'https://www.breakingbadapi.com/api/'
});

const configAxiosLaravel = axios.create({
  // baseURL: 'http://127.0.0.1/api/',
  baseURL: 'https://frases-personajes-konecta.herokuapp.com/api/',
  headers: {
    'Accept': 'application/json'
  }
});

export { configAxios, configAxiosLaravel };