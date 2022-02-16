import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Bar() {
  const links = [
    { nombre: 'Personajes', url: '/personajes' },
    { nombre: 'Frases', url: '/frases' }
  ];
  
  return (
    <Box
      sx={{ flexGrow: 1 }}>
      <AppBar
        color='primary'>
        <Toolbar>
          <Typography
            variant='h6' 
            component='div' 
            sx={{ flexGrow: 1 }}>
            Semillero Konecta
          </Typography>
          {
            links.map(link => (
              <Button
                key={link.nombre}
                component={Link}
                to={link.url}
                color='inherit'>
                { link.nombre }
              </Button>
            ))
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export { Bar };