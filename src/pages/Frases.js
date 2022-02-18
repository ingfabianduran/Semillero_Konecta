import { useState, useEffect } from 'react';
import { getData } from '../api/api';
import { configAxios as axios } from '../api/axios';
import _ from 'lodash';
import { Grid } from '@mui/material';
import { BoxFrase } from '../components/Frases/BoxFrase';

function Frases() {
  const [frases, setFrases] = useState([]);

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
    return dataEstructurada;
  };

  const loadData = async() => {
    const dataFrases = await getProfilePersonaje();
    setFrases(dataFrases)
  };

  useEffect(async() => {
    loadData();
  }, []);

  return (
    <Grid
      container
      spacing={3}>
      {
        frases.map(frase => (
          <BoxFrase 
            key={frase.personaje} 
            frase={frase} />
        ))
      }
    </Grid>
  )
}

export { Frases };