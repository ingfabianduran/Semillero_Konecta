import { Grid, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { RowTableFrase } from 'components/Frases/RowTableFrase';
import { FrasesContext } from 'context/FrasesContex';
import { useContext } from 'react';

function TableFrase() {
  const columnsName = ['', 'Nombre del Personaje', 'Foto'];
  const { frases } = useContext(FrasesContext);

  return (
    <Grid
      item
      xs={12}>
      <TableContainer
        component={Paper}>
        <Table
          aria-label='Lista de personajes'>
          <TableHead>
            <TableRow
              sx={{ backgroundColor: '#212121' }}>
              {
                columnsName.map(columna => (
                  <TableCell
                    key={columna}
                    sx={{ color: '#fafafa', textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>
                    { columna }
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              frases.map(frase => (
                <RowTableFrase 
                  frase={frase}
                  key={frase.personaje || frase.id} />
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export { TableFrase };