import { Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';

function Home() {
  return (
    <>
      <Helmet>
        <title>Breaking Bad API</title>
      </Helmet>
      <Stack
        direction='column'>
        <Typography 
          variant='h2'
          gutterBottom
          component='div'
          sx={{ textAlign: 'center' }}>
          Breaking Bad API 
        </Typography>
      </Stack>
    </>
  )
}

export { Home };