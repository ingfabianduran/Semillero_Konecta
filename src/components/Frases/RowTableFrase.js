import { Fragment, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, Collapse, Rating, } from '@mui/material';
import { InsertPhoto, KeyboardArrowDown, KeyboardArrowUp, Visibility } from '@mui/icons-material/';
import { FotoPersonaje } from '../Personajes/FotoPersonaje';
import { ComentarioFrase } from './ComentarioFrase';

function RowTable({ frase }) {
  const [expandTable, setExpandTable] = useState(false);
  const [openFoto, setOpenFoto] = useState(false);
  const [openComentarios, setOpenComentarios] = useState(false);
  const [fraseSeleccionada, setFraseSeleccionada] = useState(null);
  const [dataForm, setDataForm] = useState({ comentario: '' });
  const columnsExpand = ['Id', 'Descripcion de la Frase', 'Calificacion', 'Comentarios'];

  const closeFoto = () => setOpenFoto(false);
  const closeComentario = () => setOpenComentarios(false);
  
  const submitForm = (values) => {
    console.log(values);
  };

  return (
    <Fragment
      key={frase.personaje}>
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
          <TableCell>{ frase.personaje }</TableCell>
          <TableCell
            sx={{ textAlign: 'center' }}>
            <Button
              variant='contained'
              endIcon={<InsertPhoto />}
              disabled={frase.foto !== '' ? false : true}
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
                          value={data.calificacion} />
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

export { RowTable };