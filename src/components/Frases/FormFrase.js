import { Grid, FormControl, TextField, Rating, Button } from '@mui/material';

function FormFrase({ deleteRow, changeRow, frase, calificacion }) {
  return (    
    <Grid
      container
      spacing={1}
      sx={{ marginTop: 1 }}>
      <Grid
        item
        xs={12}
        sm={12}
        md={8}>
        <FormControl
          fullWidth>
          <TextField
            name='frase'
            label='Frase' 
            variant='outlined'
            value={frase}
            onChange={event => changeRow('frase', event.target.value)} />
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={2}>
        <Rating 
          value={calificacion}
          onChange={(event, value) => changeRow('calificacion', value) } />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={2}>
        <Button
          variant='contained'
          color='secondary'
          fullWidth
          onClick={deleteRow}>
          Eliminar
        </Button>
      </Grid>
    </Grid>
    
  )
}

export { FormFrase };