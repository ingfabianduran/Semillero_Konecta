import { Routes as ReactRouter, Route } from 'react-router-dom';
import { Frases } from '../pages/Frases';
import { Personajes } from '../pages/Personajes';

function Routes() {
  const routes = [
    { url: '/', elemento: <Frases /> },
    { url: '/personajes', elemento: <Personajes /> }
  ];

  return (
    <ReactRouter>
      {
        routes.map(route => (
          <Route
            key={route.url}
            path={route.url}
            element={route.elemento}>
          </Route>
        ))
      }
    </ReactRouter>
  )
}

export { Routes };