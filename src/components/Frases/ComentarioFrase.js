import { Dialog, Card, CardContent, Stack, TextField, Button, Divider, List, ListItem, ListItemText } from '@mui/material';
import { useFormik } from 'formik';
import { validationComentario } from 'validators/validators';

function ComentarioFrase({ openDialog, closeDialog, frase, dataForm, submitForm }) {
  const formik = useFormik({
    initialValues: dataForm,
    validationSchema: validationComentario,
    onSubmit: (values, { resetForm }) => {
      submitForm(values, frase.id);
      resetForm({ comentario: '' });
    }
  });

  return (
    <Dialog
      open={openDialog}
      onClose={closeDialog}
      fullWidth
      maxWidth='sm'>
      <Card>
        <CardContent>
          <form
            autoComplete='off'
            onSubmit={formik.handleSubmit}>
            <Stack
              direction='row'
              spacing={1}>
              <TextField
                label='Comentario'
                variant='outlined'
                fullWidth
                name='comentario'
                value={formik.values.comentario}
                onChange={formik.handleChange}
                error={formik.touched.comentario && Boolean(formik.errors.comentario)}
                helperText={formik.touched.comentario && formik.errors.comentario} />
              <Button
                variant='contained'
                type='submit'>
                Registrar
              </Button>
            </Stack>
          </form>
          <Divider
            sx={{ marginTop: 2, fontFamily: 'Roboto Condensed', fontWeight: 'bold' }}>
            Comentarios
          </Divider>
          <List>
            {
              frase.comentarios.map(comentario => (
                <ListItem
                  key={comentario}>
                  <ListItemText 
                    primary={comentario} />
                </ListItem>
              ))
            }
          </List>
        </CardContent>
      </Card>  
    </Dialog>
  )
}

export { ComentarioFrase };