import { SET_FRASES } from './types';

const setFrases = (frases) => {
  return {
    type: SET_FRASES,
    frases
  }
};

export { setFrases };