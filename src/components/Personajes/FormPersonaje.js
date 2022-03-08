import { Grid, TextField } from '@mui/material';

function FormPersonaje({ searchPersonaje }) {
  return (
    <Grid
      item
      xs={10}
      sx={{ display: 'flex', justifyContent: 'center' }}>
      <TextField
        sx={{ width: 600, backgroundColor: 'white' }}
        label='Buscar Personaje'
        variant='outlined' 
        autoComplete='off'
        fullWidth 
        onChange={searchPersonaje}/>
    </Grid>
  )
}

export { FormPersonaje };