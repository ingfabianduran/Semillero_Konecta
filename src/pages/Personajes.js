import { useState, useEffect } from 'react';
import { getPersonajes as apiGetPersonajes } from '../api/Personajes/personajes';

function Personajes() {
  const [personajes, setPersonajes] = useState([]);
  const [numPages, setNumPages] = useState(1);
  const [page, setPage] = useState(1);

  const getPersonajes = async() => {
    const offset = (page - 1) * 5;
    const dataPersonajes = await apiGetPersonajes(`?limit=5&offset=${offset}`);
    setPersonajes(dataPersonajes);
  };

  const setTotalPages = async() => {
    const dataNumPages = await apiGetPersonajes();
    const totalPersonajes = dataNumPages.length;
    const pages = Math.ceil(totalPersonajes / 5);
    setNumPages(pages);
  };
  
  useEffect(() => {
    setTotalPages();
    getPersonajes();
  }, []);

  return (
    <>
    </>
  )
}

export { Personajes };