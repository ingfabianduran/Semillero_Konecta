import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from 'store/Ui/actions';
import { Grid, CircularProgress } from '@mui/material';
import { TableFrase } from 'components/Frases/TableFrase';
import { PaginationPersonaje } from 'components/Personajes/PaginationPersonaje';
import { FrasesContext } from 'context/FrasesContex';
import { getMisPersonajes } from 'services/MisPersonajes';

function MisPersonajes() {
  const [frases, setFrases] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [page, setPage] = useState(null);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading);

  const loadData = async() => {
    try {
      dispatch(setLoading(true));
      const url = `personajes/all?page=${page}`;
      const { data, current_page, last_page } = await getMisPersonajes(url);
      setFrases(data);
      setNumPages(last_page);
      setPage(current_page);
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 1000);
    } catch (error) {
      
    }
  };

  const changePage = (event, value) => setPage(value);
  
  useEffect(() => {
    loadData();
  }, [page]);

  return (
    <FrasesContext.Provider
      value={{ frases }}>
      <Grid
        container
        spacing={3}
        justifyContent='center'>
        {
          !loading ?
            <>
              <TableFrase />
              <PaginationPersonaje 
                page={page}
                numPages={numPages}
                changePage={changePage} />
            </>
          :
            <CircularProgress 
             size={60} />
        }
      </Grid>
    </FrasesContext.Provider>
  )
}

export { MisPersonajes };