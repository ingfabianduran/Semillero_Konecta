import { Stack, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { MenuApp } from 'components/Layout/MenuApp';

function Home() {
  return (
    <Stack
      direction='column'>
      <Typography 
        variant='h2'
        gutterBottom
        component='div'
        sx={{ textAlign: 'center' }}>
        Breaking Bad API 
      </Typography>
      <Stack
        justifyContent='center'
        direction='row'
        spacing={2}>
        <MenuApp />
      </Stack>
    </Stack>
  )
}

export { Home };