import { SET_PERSONAJES } from './types';

const setPersonajes = (personajes) => {
  return {
    type: SET_PERSONAJES,
    personajes
  }
};

export { setPersonajes };