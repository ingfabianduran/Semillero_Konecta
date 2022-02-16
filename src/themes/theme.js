import { createTheme } from '@mui/material/styles';
import { deepPurple, grey } from '@mui/material/colors';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto Condensed',
    ]
  },
  palette: {
    primary: {
      main: deepPurple[500]
    },
    secondary: {
      main: grey[100]
    }
  }
});

export { theme };