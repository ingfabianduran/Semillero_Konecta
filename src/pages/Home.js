import { Stack, Typography } from '@mui/material';

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
      </Stack>
    </Stack>
  )
}

export { Home };