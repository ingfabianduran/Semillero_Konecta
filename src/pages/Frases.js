import { useEffect } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import { TableFrase } from 'components/Frases/TableFrase';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from 'store/Ui/actions';
import { setFrases } from 'store/Frases/actions';
import { FrasesContext } from 'context/FrasesContex';
import { addCommentsAndRaiting } from 'services/Frases';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

function Frases() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.uiReducer.loading);
  const frases = useSelector(state => state.frasesReducer.frases);

  const loadData = async() => {
    try {
      dispatch(setLoading(true));
      if (localStorage.getItem('frases')) {
        dispatch(setFrases(JSON.parse(localStorage.getItem('frases'))));
      } else {
        const getFrases = await addCommentsAndRaiting();
        dispatch(setFrases(getFrases));
        localStorage.setItem('frases', JSON.stringify(getFrases));
      }
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 1000);
    } catch (error) {
      toast.error('Algo inesperado ocurrio aquí');
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <FrasesContext.Provider
      value={{ frases }}>
      <Helmet>
        <title>Frases | Breaking Bad API</title>
      </Helmet>
      <Grid
        container
        spacing={3}
        justifyContent='center'>
        {
          !loading ?
            <TableFrase />
          :
            <CircularProgress 
              size={60} />
        }
      </Grid>
    </FrasesContext.Provider>
  )
}

export { Frases };