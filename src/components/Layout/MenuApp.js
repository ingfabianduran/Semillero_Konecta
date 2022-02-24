import { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function MenuApp({ variant = 'outlined', size = 'large', color = 'primary' }) {
  const [areaMenu, setAreaMenu] = useState(null);
  const open = Boolean(areaMenu);
  const navigate = useNavigate();
  const links = [
    { nombre: 'Personajes', url: '/personajes' },
    { nombre: 'Frases', url: '/frases' },
    { nombre: 'Mis Personajes', url: '/mis_personajes' }
  ];

  const openMenu = (event) => setAreaMenu(event.currentTarget);
  const closeMenu = (url) => {
    if (url) {
      setAreaMenu(null);
      navigate(url);
    } else {
      setAreaMenu(null);
    }
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        color={color}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={openMenu}>
        Menu
      </Button>
      <Menu
        anchorEl={areaMenu}
        open={open}
        onClose={closeMenu}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}>
        {
          links.map(link => (
            <MenuItem
              key={link.nombre}
              onClick={() => closeMenu(link.url) }>
              { link.nombre }
            </MenuItem>
          ))
        }
      </Menu>
    </>
  )
}

export { MenuApp };