import { Bar } from './components/Layout/Bar';
import { Footer } from './components/Layout/Footer';
import { Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './themes/theme';
import { CircularProgress } from '@mui/material';
import { Routes } from './routes/Routes';

function App() {
  return (
    <ThemeProvider
      theme={theme}>
      <div>
        <Bar />
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          style={{ minHeight: '90vh' }}>
          {/* <CircularProgress 
            size={60} /> */}
          <Routes />
        </Grid>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;