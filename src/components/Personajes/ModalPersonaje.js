import { Dialog } from '@mui/material';

function ModalPersonaje({ openModal, setOpenModal }) {
  return (
    <Dialog
      open={openModal}
      onClose={setOpenModal}>
    </Dialog>
  )
}

export { ModalPersonaje };