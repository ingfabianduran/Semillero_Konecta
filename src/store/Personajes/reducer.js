import { SET_PERSONAJES } from './types';

const initialState = {
  personajes: []
};

const personajesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PERSONAJES: 
      return {
        ...state,
        personajes: action.personajes
      }
    default: 
      return state
  }
};

export { personajesReducer };