import { getData } from '../api/api';
import { configAxios as axios } from '../api/axios';
import _ from 'lodash';
import { faker } from '@faker-js/faker';

const estructurarData = async() => {
  try {
    const dataFrases = await getData('quotes');
    const listAgrupada = _.chain(dataFrases).groupBy('author').value();
    let dataEstructurada = [];
    for (const key in listAgrupada) {
      const dataFrasesModificada = {
        personaje: key,
        foto: '',
        frases: listAgrupada[key].map(item => {
          return {
            id: item.quote_id,
            frase: item.quote,
            comentarios: [],
            listaCalificaciones: []
          }
        })
      };
      dataEstructurada.push(dataFrasesModificada);
    }
    return dataEstructurada;
  } catch (error) {

  }
};

const getProfilePersonaje = async() => {
  try {
    const dataEstructurada = await estructurarData();
    const resPerfilPersonaje = await Promise.all(
      dataEstructurada.map(item => axios({
        method: 'GET',
        url: `characters?name=${item.personaje}`
      }))
    );
    for (let i = 0; i < dataEstructurada.length; i ++) {
      const nombrePersonaje = dataEstructurada[i].personaje;
      for (let j = 0; j < resPerfilPersonaje.length; j ++) {
        if (resPerfilPersonaje[j].data.length > 0 && resPerfilPersonaje[j].data[0].name === nombrePersonaje) {
          dataEstructurada[i].foto = resPerfilPersonaje[j].data[0].img;
        } 
      }
    }
    return dataEstructurada;
  } catch (error) {

  }
};

const addCommentsAndRaiting = async() => {
  try {
    const dataWithProfile = await getProfilePersonaje();
    for (let i = 0; i < dataWithProfile.length; i ++) {
      const frasesWithData = dataWithProfile[i].frases;
      for (let j = 0; j < frasesWithData.length; j ++) {
        const raiting = faker.random.arrayElements([1, 2, 3, 4, 5], 1)[0];
        const numberCommets = faker.random.arrayElements([1, 2, 3, 4, 5], 1)[0];
        frasesWithData[j].listaCalificaciones.push(raiting);
        for (let k = 0; k < numberCommets; k ++) {
          const comentario = faker.random.words(5);
          frasesWithData[j].comentarios.push(comentario);
        }
      }
    }
    return dataWithProfile;
  } catch (error) {
    
  }
};

export { addCommentsAndRaiting };