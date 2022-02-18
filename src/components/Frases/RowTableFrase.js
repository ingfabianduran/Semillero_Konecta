import { Fragment, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, Collapse, Rating, } from '@mui/material';
import { InsertPhoto, KeyboardArrowDown, KeyboardArrowUp, Visibility } from '@mui/icons-material/';

function RowTable({ frase }) {
  const [expandTable, setExpandTable] = useState(false);
  const columnsExpand = ['Id', 'Descripcion de la Frase', 'Calificacion', 'Comentarios'];

  return (
    <Fragment
      key={frase.personaje}>
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
              disabled={frase.foto !== '' ? false : true}>
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
                        <Rating />
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Button
                          variant='contained'
                          endIcon={<Visibility/>}
                          size='small'>
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