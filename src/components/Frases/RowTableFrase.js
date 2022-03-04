import { Fragment, useState, useContext } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, Collapse, Rating, } from '@mui/material';
import { InsertPhoto, KeyboardArrowDown, KeyboardArrowUp, Visibility } from '@mui/icons-material/';
import { FotoPersonaje } from 'components/Personajes/FotoPersonaje';
import { ComentarioFrase } from 'components/Frases/ComentarioFrase';
import { FrasesContext } from 'context/FrasesContex';
import { toast } from 'react-toastify';
import { updateCalificacion, addComentario } from 'services/MisPersonajes';

function RowTableFrase({ frase }) {
  const [expandTable, setExpandTable] = useState(false);
  const [openFoto, setOpenFoto] = useState(false);
  const [openComentarios, setOpenComentarios] = useState(false);
  const [fraseSeleccionada, setFraseSeleccionada] = useState(null);
  const [dataForm, setDataForm] = useState({ comentario: '' });
  const { frases, setFrases, isApiConsumer, page } = useContext(FrasesContext);
  const columnsExpand = ['Id', 'Descripcion de la Frase', 'Calificacion', 'Promedio', 'Comentarios'];

  const closeFoto = () => setOpenFoto(false);
  const closeComentario = () => setOpenComentarios(false);

  const updateRaitingFrase = async(id, calificacion, personaje) => {
    if (!isApiConsumer) {
      const fraseSeleccionada = frase;
      for (let i = 0; i < fraseSeleccionada.frases.length; i ++) {
        if (fraseSeleccionada.frases[i].id === id) {
          fraseSeleccionada.frases[i].listaCalificaciones.push(calificacion);
          break;
        }
      }
      const frasesUpdateRaiting = frases;
      for (let i = 0; i < frasesUpdateRaiting.length; i ++) {
        if (frasesUpdateRaiting[i].personaje === personaje) {
          frasesUpdateRaiting[i].frases = fraseSeleccionada.frases;
        }
      }
      localStorage.setItem('frases', JSON.stringify(frasesUpdateRaiting));
      setFrases(frasesUpdateRaiting);
      setExpandTable(false);
      toast.success('Calificación Actualizada Correctamente!!!');
    } else {
      try {
        const dataCalificacion = { nota: calificacion, frase_id: id };
        const { message, data } = await updateCalificacion(dataCalificacion, page);
        setExpandTable(false);
        toast.success(message);
        setFrases(data);
      } catch (error) {
        toast.error('Algo inesperado ocurrio aquí');
      }
    }
  };

  const submitForm = async(values, id) => {
    if (!isApiConsumer) {
      const { comentario } = values;
      const frasesWithNewComment = frases;
      for (let i = 0; i < frasesWithNewComment.length; i ++) {
        for (let j = 0; j < frasesWithNewComment[i].frases.length; j ++) {
          if (frasesWithNewComment[i].frases[j].id === id) {
            frasesWithNewComment[i].frases[j].comentarios.push(comentario);
          }
        }
      }
      localStorage.setItem('frases', JSON.stringify(frasesWithNewComment));
      setFrases(frasesWithNewComment);  
      setOpenComentarios(false);
      setDataForm({ comentario: '' });
      toast.success('Comentario Agregado Correctamente!!!');
    } else {
      try {
        const dataComentario = { comentario: values.comentario, frase_id: id };
        const { message, data } = await addComentario(dataComentario, page);
        setFrases(data);
        setOpenComentarios(false);
        setDataForm({ comentario: '' });
        toast.success(message);
      } catch (error) {
        toast.error('Algo inesperado ocurrio aquí');
      }
    }
  };

  const getPromedioCalificaciones = (calificaciones) => {
    const sumatoria = calificaciones.reduce((previous, current) => current += previous);
    const promedio = sumatoria / calificaciones.length;
    return parseFloat(promedio.toFixed(1));
  };

  const getCalificacionesByApi = (data) => {
    if (data.length > 0) {
      const calificaciones = data.map(item => item.nota);
      return calificaciones;
    }
    return [0];
  };

  return (
    <Fragment
      key={frase.personaje || frase.nombreCompleto}>
      <FotoPersonaje 
        openDialog={openFoto} 
        closeDialog={closeFoto}
        urlFoto={frase.foto} />
      {
        fraseSeleccionada !== null &&
          <ComentarioFrase 
            openDialog={openComentarios} 
            closeDialog={closeComentario}
            frase={fraseSeleccionada}
            dataForm={dataForm}
            submitForm={submitForm} />
      }
      <TableRow>
          <TableCell>
            <IconButton
              aria-label='Expand Table'
              size='small'
              onClick={() => setExpandTable(!expandTable)}>
              {
                expandTable ? <KeyboardArrowUp /> : <KeyboardArrowDown />
              }
            </IconButton>
          </TableCell>
          <TableCell>{ frase.personaje || frase.nombreCompleto }</TableCell>
          <TableCell
            sx={{ textAlign: 'center' }}>
            <Button
              variant='contained'
              endIcon={<InsertPhoto />}
              disabled={frase.foto !== '' && frase.foto !== null ? false : true}
              onClick={() => setOpenFoto(true)}>
              Ver Foto
            </Button>
          </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ padding: 0 }} colSpan={3}>
          <Collapse
            in={ expandTable }
            timeout='auto' 
            unmountOnExit>
            <Table
              size='small'
              aria-label='Lista de Frases'>
              <TableHead>
                <TableRow
                  sx={{ backgroundColor: '#212121' }}>
                  {
                    columnsExpand.map(columna => (
                      <TableCell 
                        key={columna}
                        sx={{ color: '#fafafa', textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>
                        { columna }
                      </TableCell>
                    ))
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  frase.frases.map(data => (
                    <TableRow
                      key={data.id}>
                      <TableCell sx={{ textAlign: 'center' }}>{ data.id }</TableCell>
                      <TableCell>{ data.frase }</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Rating 
                          value={getPromedioCalificaciones(data.listaCalificaciones || getCalificacionesByApi(data.notas))}
                          onChange={(event, value) => updateRaitingFrase(data.id, value, frase.personaje) } />
                      </TableCell>
                      <TableCell
                        sx={{ textAlign: 'center' }}>
                        {
                          getPromedioCalificaciones(data.listaCalificaciones || getCalificacionesByApi(data.notas))
                        }
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Button
                          variant='contained'
                          endIcon={<Visibility/>}
                          size='small'
                          onClick={() => {
                            setOpenComentarios(true);
                            setFraseSeleccionada(data);
                          }}>
                            Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export { RowTableFrase };