import { Grid, Card, CardMedia } from '@mui/material';
import AvatarDefault from '../../img/Avatar.png';

function BoxFrase({ frase }) {
  return (
    <Grid
      item
      xs={12}>
      <Card
        sx={{ display: 'flex' }}>
        <CardMedia
          component='img'
          sx={{ width: 150 }} 
          image={frase.foto !== '' ? frase.foto : AvatarDefault} 
          alt='Personaje Breaking Bad' />
      </Card>
    </Grid>
  )
}

export { BoxFrase };