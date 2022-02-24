import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Home } from 'pages/Home';

test('Validar si existe un titulo', async() => {
  const { findByText } = render(
    <Router>
      <App />
    </Router>);
  const title = await findByText(/Breaking Bad API/i);
  expect(title).toBeInTheDocument();
});
