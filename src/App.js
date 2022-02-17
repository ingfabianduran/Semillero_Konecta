import { Bar } from './components/Layout/Bar';
import { Footer } from './components/Layout/Footer';
import { Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './themes/theme';
import { Routes } from './routes/Routes';

function App() {
  return (
    <ThemeProvider
      theme={theme}>
      <Bar />
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ padding: 10, minHeight: '100vh', backgroundColor: '#fafafa' }}>
        <Routes />
      </Grid>
      <Footer />
    </ThemeProvider>
  );
}

export default App;