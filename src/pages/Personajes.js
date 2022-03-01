import { useState, useEffect } from 'react';
import { getData as apiGetPersonajes } from 'api/api';
import { Grid, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from 'store/Ui/actions';
import { PaginationPersonaje } from 'components/Personajes/PaginationPersonaje';
import { FormPersonaje } from 'components/Personajes/FormPersonaje';
import { ListPersonaje } from 'components/Personajes/ListPersonaje';
import { toast } from 'react-toastify';

function Personajes() {
  const dispatch = useDispatch();
  const [busquedaPersonaje, setBusquedaPersonaje] = useState('');
  const [personajes, setPersonajes] = useState([]);
  const [numPages, setNumPages] = useState(1);
  const [page, setPage] = useState(1);
  const loading = useSelector(state => state.loading);

  const changePage = (event, value) => setPage(value);

  const loadData = async(url, urlForPages = 'characters') => {
    try {
      dispatch(setLoading(true));
      const dataPersonajes = await apiGetPersonajes(url);
      const dataForNumPages = await apiGetPersonajes(urlForPages);
      const totalPersonajes = dataForNumPages.length;
      const pages = Math.ceil(totalPersonajes / 5);
      setPersonajes(dataPersonajes);
      setNumPages(pages);
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 1000);
    } catch (error) {
      toast.error('Algo inesperado ocurrio aquí');
      dispatch(setLoading(false));
    }
  };

  const setBusquedaTextField = (event) => {
    const textBusqueda = event.target.value;
    setBusquedaPersonaje(textBusqueda);
    setPage(1);
  };
  
  useEffect(() => {
    const offset = (page - 1) * 5;
    if (busquedaPersonaje === '') {
      const url = `characters?limit=5&offset=${offset}`;
      loadData(url);
    } else {
      const url = `characters?name=${busquedaPersonaje}&limit=5&offset=${offset}`;
      const urlForPage = `characters?name=${busquedaPersonaje}`
      loadData(url, urlForPage);
    }
  }, [page, busquedaPersonaje]);

  return (
    <Grid
      container
      spacing={3}
      columns={10}
      justifyContent='center'>
      <FormPersonaje 
        searchPersonaje={setBusquedaTextField} />
        {
          !loading ?
            <>
              <ListPersonaje 
                personajes={personajes} />
              <PaginationPersonaje 
                page={page}
                numPages={numPages}
                changePage={changePage} />
            </>
          :
            <CircularProgress 
              size={60} 
              sx={{ marginTop: 2 }} />
        }
    </Grid>
  )
}

export { Personajes };