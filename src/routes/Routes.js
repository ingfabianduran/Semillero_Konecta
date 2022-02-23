import { Routes as ReactRouter, Route } from 'react-router-dom';
import { Frases } from '../pages/Frases';
import { Personajes } from '../pages/Personajes';
import { Home } from '../pages/Home';

function Routes() {
  const routes = [
    { url: '/frases', elemento: <Frases /> },
    { url: '/personajes', elemento: <Personajes /> },
    { url: '/', elemento: <Home /> },
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