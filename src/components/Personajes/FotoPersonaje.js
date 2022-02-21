import { Dialog, Card, CardMedia } from '@mui/material';

function FotoPersonaje({ openDialog, closeDialog, urlFoto }) {
  return (
    <Dialog
      open={openDialog}
      onClose={closeDialog}>
        <Card>
          <CardMedia 
            component='img' 
            height='200'
            image={urlFoto}
            alt='Foto Personaje' />
        </Card>
    </Dialog>
  )
}

export { FotoPersonaje };