import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { MenuApp } from 'components/Layout/MenuApp';

function Bar() {
  return (
    <Box
      sx={{ flexGrow: 1 }}>
      <AppBar
        color='primary'>
        <Toolbar>
          <Typography
            variant='h6' 
            component={Link}
            to='/' 
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
            Semillero Konecta
          </Typography>
          <MenuApp 
            size='medium'
            variant='text'
            color='inherit' /> 
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export { Bar };