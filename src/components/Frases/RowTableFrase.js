import { Fragment, useState, useContext } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, Collapse, Rating, } from '@mui/material';
import { InsertPhoto, KeyboardArrowDown, KeyboardArrowUp, Visibility } from '@mui/icons-material/';
import { FotoPersonaje } from 'components/Personajes/FotoPersonaje';
import { ComentarioFrase } from 'components/Frases/ComentarioFrase';
import { FrasesContext } from 'context/FrasesContex';
import { toast } from 'react-toastify';
import { updateCalificacion, addComentario } from 'services/MisPersonajes';

function RowTableFrase({ frase }) {
  console.log(frase);
  const [expandTable, setExpandTable] = useState(false);
  const [openFoto, setOpenFoto] = useState(false);
  const [openComentarios, setOpenComentarios] = useState(false);
  const [fraseSeleccionada, setFraseSeleccionada] = useState(null);
  const [dataForm, setDataForm] = useState({ comentario: '' });
  const { frases, setFrases, isApiConsumer, page } = useContext(FrasesContext);
  const columnsExpand = ['Id', 'Descripcion de la Frase', 'Calificacion', 'Comentarios'];
  const [startSelect, setStartSelect] = useState();

  const closeFoto = () => setOpenFoto(false);
  const closeComentario = () => setOpenComentarios(false);

  const updateRaitingFrase = async(id, calificacion, personaje) => {
    if (!isApiConsumer) {
      const fraseSeleccionada = frase;
      for (let i = 0; i < fraseSeleccionada.frases.length; i ++) {
        if (fraseSeleccionada.frases[i].id === id) {
          fraseSeleccionada.frases[i].calificacion =  calificacion;
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
      toast.success('Calificación Actualizada Correctamente!!!');
    } else {
      try {
        const url = `frases/${id}`;
        const dataCalificacion = { calificacion: calificacion };
        const { message, data } = await updateCalificacion(url, dataCalificacion, page);
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
      setDataForm({ comentario: '' });
      toast.success('Comentario Agregado Correctamente!!!');
    } else {
      try {
        const dataCalificacion = { comentario: values.comentario, frase_id: id };
        const { message, data } = await addComentario(dataCalificacion, page);
        setFrases(data);
        setOpenComentarios(false);
        setDataForm({ comentario: '' });
        toast.success(message);
      } catch (error) {
        toast.error('Algo inesperado ocurrio aquí');
      }
    }
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
                          value={data.calificacion}
                          onChange={(event, value) => updateRaitingFrase(data.id, value, frase.personaje) } 
                          onChangeActive={(event, value) => {
                            setStartSelect(value);
                          }} />
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