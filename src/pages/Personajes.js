import { useState, useEffect } from 'react';
import { getPersonajes as apiGetPersonajes } from '../api/Personajes/personajes';
import { Grid, CircularProgress } from '@mui/material';
import { CardPersonaje } from '../components/Personajes/CardPersonaje';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../store/Ui/actions';
import { PaginationPersonaje } from '../components/Personajes/PaginationPersonaje';
import { FormPersonaje } from '../components/Personajes/FormPersonaje';

function Personajes() {
  const dispatch = useDispatch();
  const [personajes, setPersonajes] = useState([]);
  const [numPages, setNumPages] = useState(1);
  const [page, setPage] = useState(1);
  const loading = useSelector(state => state.loading);

  const getPersonajes = async() => {
    const offset = (page - 1) * 5;
    const dataPersonajes = await apiGetPersonajes(`?limit=5&offset=${offset}`);
    setPersonajes(dataPersonajes);
  };

  const setTotalPages = async() => {
    const dataNumPages = await apiGetPersonajes();
    const totalPersonajes = dataNumPages.length;
    const pages = Math.ceil(totalPersonajes / 5);
    setNumPages(pages);
  };

  const changePage = (event, value) => setPage(value);
  
  useEffect(() => {
    dispatch(setLoading(true));
    setTotalPages();
    getPersonajes();
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  }, [page]);

  return (
    !loading ? 
      <Grid
        container
        spacing={3}
        columns={10}>
        <FormPersonaje />
        {
          personajes.map(personaje => (
            <Grid
              key={personaje.char_id} 
              item
              xs={10}
              md={2}>
              <CardPersonaje
                personaje={personaje} />
            </Grid>
          ))
        }
        <PaginationPersonaje 
          page={page}
          numPages={numPages}
          changePage={changePage} />
      </Grid>
    :
      <CircularProgress 
        size={60}/>
  )
}

export { Personajes };