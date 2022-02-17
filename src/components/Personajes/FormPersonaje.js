import { Grid, TextField } from '@mui/material';

function FormPersonaje() {
  return (
    <Grid
      item
      xs={10}
      sx={{ display: 'flex', justifyContent: 'center' }}>
      <TextField
        sx={{ width: 600 }}
        label='Buscar Personaje'
        variant='outlined' 
        fullWidth />
    </Grid>
  )
}

export { FormPersonaje };