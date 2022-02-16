import { Paper, Box } from '@mui/material';

function Footer() {
  return (
    <Paper
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0 }}>
      <Box
        sx={{ 
          textAlign: 'center', 
          padding: 2, 
          fontWeight: 'bold', 
          fontSize: 12, 
          fontFamily: 'Roboto Condensed',
          backgroundColor: '#eeeeee' }}>
        Grupo Konecta - 2022
      </Box>
    </Paper>
  )
}

export { Footer };