import { Grid, Typography } from '@mui/material';
import { CardPersonaje } from 'components/Personajes/CardPersonaje';

function ListPersonaje({ personajes }) {
  return (
    <>
      {
        personajes.length > 0 ?
          personajes.map(personaje => (
            <Grid
              key={personaje.char_id} 
              item
              xs={10}
              md={2}>
              <CardPersonaje
                personaje={personaje} />
            </Grid>
          ))
        :  
          <Typography
            variant='h2'
            component='div'
            gutterBottom>
            No hay datos que mostrar
          </Typography>
      }
    </>
  )
}

export { ListPersonaje };