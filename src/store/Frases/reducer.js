import { SET_FRASES } from './types';

const initialState = {
  frases: []
};

const frasesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FRASES: 
      return {
        ...state,
        frases: action.frases
      }
    default: 
      return state
  }
};

export { frasesReducer };