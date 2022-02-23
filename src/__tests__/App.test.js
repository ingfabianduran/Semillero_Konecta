import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';
import { BrowserRouter as Router } from 'react-router-dom';

test('Validar si existe un titulo', async() => {
  const { findByText } = render(
    <Router>
      <App />
    </Router>);
  const title = await findByText(/Breaking Bad API/i);
  expect(title).toBeInTheDocument();
});

test('Search form personaje', async() => {
  render(
    <Router>
      <App />
    </Router>);
  const input = await screen.findByRole('textbox');
  fireEvent.change(input, { value: 'Jesse' });
});
