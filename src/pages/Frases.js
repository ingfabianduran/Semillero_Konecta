import { useEffect } from 'react';
import { getData } from '../api/api';
import { configAxios as axios } from '../api/axios';
import _ from 'lodash';

function Frases() {
  const estructurarData = async() => {
    const dataFrases = await getData('quotes');
    const listAgrupada = _.chain(dataFrases).groupBy('author').value();
    let dataEstructurada = [];
    for (const key in listAgrupada) {
      const dataFrasesModificada = {
        personaje: key,
        foto: '',
        frases: listAgrupada[key].map(item => {
          return {
            frase: item.quote,
            comentarios: [],
            calificacion: ''
          }
        })
      };
      dataEstructurada.push(dataFrasesModificada);
    }
    return dataEstructurada;
  };

  const getProfilePersonaje = async() => {
    const dataEstructurada = await estructurarData();
    const resPerfilPersonaje = await Promise.all(
      dataEstructurada.map(item => axios({
        method: 'GET',
        url: `characters?name=${item.personaje}`
      }))
    );
    dataEstructurada.map(item => {
      const nombrePersonaje = item.personaje;
      const foto = resPerfilPersonaje.filter(personaje => {
        if (personaje.data.length > 0) {
          return personaje.data[0].name === nombrePersonaje;
        } 
      });
      if (foto.length > 0) item.foto = foto[0].data[0].img;
    });
  };

  useEffect(() => {
    getProfilePersonaje();
  }, []);

  return (
    <>
    </>
  )
}

export { Frases };