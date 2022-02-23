import { Stack, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Stack
      direction='column'>
      <Typography 
        variant='h2'
        gutterBottom
        component='div'>
        Breaking Bad API 
      </Typography>
      <Stack
        justifyContent='center'
        direction='row'
        spacing={2}>
        <Button
          variant='outlined'
          size='large'
          component={Link}
          to='/personajes'>
          Personajes
        </Button>
        <Button
          variant='outlined'
          size='large'
          component={Link}
          to='/frases'>
          Frases
        </Button>
      </Stack>
    </Stack>
  )
}

export { Home };