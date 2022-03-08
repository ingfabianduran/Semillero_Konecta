import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from 'store/Ui/actions';
import { Grid, CircularProgress, Button } from '@mui/material';
import { TableFrase } from 'components/Frases/TableFrase';
import { PaginationPersonaje } from 'components/Personajes/PaginationPersonaje';
import { FrasesContext } from 'context/FrasesContex';
import { getMisPersonajes, addPersonaje } from 'services/MisPersonajes';
import { ModalPersonaje } from 'components/Personajes/ModalPersonaje';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { setFrases } from 'store/Frases/actions';

function MisPersonajes() {
  const [numPages, setNumPages] = useState(1);
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const defaultValuesForm = { frase: '', calificacion: '' };
  const [formPersonaje, setFormPersonaje] = useState({
    nombreCompleto: '',
    foto: '',
    frases: [defaultValuesForm]
  });

  const dispatch = useDispatch();
  const loading = useSelector(state => state.uiReducer.loading);
  const frases = useSelector(state => state.frasesReducer.frases);
  const isApiConsumer = true;

  const changePage = (event, value) => setPage(value);
  const closeModal = () => setOpenModal(false);

  const loadData = async() => {
    try {
      dispatch(setLoading(true));
      const url = `personajes/all?page=${page}`;
      const { data, current_page, last_page } = await getMisPersonajes(url);
      dispatch(setFrases(data));
      setNumPages(last_page);
      setPage(current_page);
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 1000);
    } catch (error) {
      toast.error('Algo inesperado ocurrio aquí');
      dispatch(setLoading(false));
    }
  };

  const submitForm = async(values) => {
    try {
      setLoadingForm(true);
      const formData = new FormData();
      formData.append('nombreCompleto', values.nombreCompleto);
      formData.append('foto', values.foto);
      formData.append('frases', JSON.stringify(values.frases));
      const { message } = await addPersonaje(formData);
      setOpenModal(false);
      setLoadingForm(false);
      toast.success(message);
      setTimeout(async() => {
        await loadData();
      }, 1500);
    } catch (error) {
      setLoadingForm(false);
      toast.error('Algo inesperado ocurrio aqui');
    }
  };
  
  useEffect(() => {
    loadData();
  }, [page]);

  return (
    <FrasesContext.Provider
      value={{ frases, setFrases, isApiConsumer, page }}>
      <Helmet>
        <title>Mis Personajes | Breaking Bad API</title>
      </Helmet>
      <ModalPersonaje 
        openModal={openModal}
        setOpenModal={closeModal}
        formPersonaje={formPersonaje}
        setFormPersonaje={setFormPersonaje}
        defaultValuesForm={defaultValuesForm}
        submitForm={submitForm}
        loadingForm={loadingForm} />
      <Grid
        container
        spacing={1}
        justifyContent='center'>
        {
          !loading ?
            <>
              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button
                  variant='contained'
                  size='large'
                  onClick={() => setOpenModal(true) }>
                  Agregar Personaje
                </Button>
              </Grid>
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