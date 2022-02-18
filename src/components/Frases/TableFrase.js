import { Grid, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { RowTable } from './RowTableFrase';

function TableFrase({ frases }) {
  const columnsName = ['', 'Nombre del Personaje', 'Foto'];

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
                <RowTable 
                  frase={frase}
                  key={frase.personaje} />
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export { TableFrase };