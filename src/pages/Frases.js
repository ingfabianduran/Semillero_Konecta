import { useState, useEffect } from 'react';
import { getData } from '../api/api';
import { configAxios as axios } from '../api/axios';
import _ from 'lodash';
import { Grid, CircularProgress } from '@mui/material';
import { TableFrase } from '../components/Frases/TableFrase';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../store/Ui/actions';
import { faker } from '@faker-js/faker';

function Frases() {
  const [frases, setFrases] = useState([]);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading);

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
            id: item.quote_id,
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

  const addCommentsAndRaiting = (dataEstructurada) => {
    const frasesWithData = dataEstructurada;
    frasesWithData.map(({ frases }) => {
      frases.map(frase => {
        const raiting = faker.random.arrayElements([1, 2, 3, 4, 5], 1);
        const numberCommets = faker.random.arrayElement([1, 2, 3, 4, 5], 1);
        frase.calificacion = raiting[0];
        for (let i = 0; i < numberCommets; i ++) {
          const comentario = faker.random.words(5);
          frase.comentarios.push(comentario);
        }
      });
    });
    return frasesWithData;
  };

  const loadData = async() => {
    dispatch(setLoading(true));
    const dataFrases = await getProfilePersonaje();
    const frasesWithCommentsAndRaiting = addCommentsAndRaiting(dataFrases);
    setFrases(frasesWithCommentsAndRaiting);
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  };

  useEffect(async() => {
    loadData();
  }, []);

  return (
    <Grid
      container
      spacing={3}
      justifyContent='center'>
      {
        !loading ?
          <TableFrase 
          frases={frases} />
        :
          <CircularProgress 
            size={60} />
      }
    </Grid>
  )
}

export { Frases };