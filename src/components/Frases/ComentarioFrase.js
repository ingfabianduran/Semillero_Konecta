import { Dialog, Card, CardContent, Stack, TextField, Divider, List, ListItem, ListItemText } from '@mui/material';
import { useFormik } from 'formik';
import { validationComentario } from 'validators/validators';
import { LoadingButton } from '@mui/lab';

function ComentarioFrase({ openDialog, closeDialog, frase, dataForm, submitForm, loading }) {
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
              <LoadingButton
                variant='contained'
                type='submit'
                loading={loading}>
                Registrar
              </LoadingButton>
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
                  key={comentario.id || comentario}>
                  <ListItemText 
                    primary={comentario.comentario || comentario} />
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