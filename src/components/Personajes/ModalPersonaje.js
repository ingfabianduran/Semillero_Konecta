import { Dialog, DialogContent, DialogActions, Grid, FormControl, TextField, Input, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { FormFrase } from 'components/Frases/FormFrase';
import { validationPersonaje } from 'validators/validators';
import { useState } from 'react';

function ModalPersonaje({ openModal, setOpenModal, formPersonaje, setFormPersonaje, submitForm, loadingForm }) {
  const defaultValuesForm = { frase: '', calificacion: 0 };
  const formik = useFormik({
    initialValues: formPersonaje,
    validationSchema: validationPersonaje,
    onSubmit: (values, { resetForm }) => {
      submitForm(values);
      setRowsFrases([defaultValuesForm]);
      resetForm({
        nombreCompleto: '',
        foto: '',
        frases: rowsFrases
      });
    }
  });
  const [rowsFrases, setRowsFrases] = useState([defaultValuesForm]);

  const addRowForm = () => {
    setRowsFrases(rowsFrases.concat(defaultValuesForm));
    setFormPersonaje({ ...formPersonaje, frases: rowsFrases });
    formik.setFieldValue('frases', rowsFrases);
  }

  const deleteFormRow = (row) => {
    const copyRows = [...rowsFrases];
    copyRows.splice(row, 1);
    setRowsFrases(copyRows);
    setFormPersonaje({ ...formPersonaje, frases: copyRows });
    formik.setFieldValue('frases', copyRows);
  };

  const changeRow = (index, name, value) => {
    const copyRows = [...rowsFrases];
    copyRows[index] = {
      ...copyRows[index],
      [name]: value
    };
    setRowsFrases(copyRows);
    setFormPersonaje({ ...formPersonaje, frases: copyRows });
    formik.setFieldValue('frases', copyRows);
  };

  return (
    <Dialog
      open={openModal}
      onClose={setOpenModal}
      fullWidth
      maxWidth='md'>
      <form
        autoComplete='off'
        onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid
            container
            spacing={1}>
            <Grid
              item
              xs={12}
              sm={12}
              md={8}>
              <FormControl
                fullWidth>
                <TextField 
                  label='Nombre del personaje' 
                  variant='outlined'
                  name='nombreCompleto'
                  value={formik.values.nombreCompleto}
                  onChange={formik.handleChange} 
                  error={formik.touched.nombreCompleto && Boolean(formik.errors.nombreCompleto)}
                  helperText={formik.touched.nombreCompleto && formik.errors.nombreCompleto} />
              </FormControl>
            </Grid>
            <Grid
            item
            xs={12}
            sm={12}
            md={2}>
              <FormControl
                fullWidth>
                <label 
                  htmlFor='contained-button-file'>
                  <Input
                    accept='image/*' 
                    id='contained-button-file' 
                    name='foto'  
                    type='file' 
                    style={{ display: 'none' }} 
                    onChange={e => {
                      const files = e.target.files[0];
                      formik.setFieldValue('foto', files);
                    }} />
                  <Button 
                    sx={{ marginRight: 1 }} 
                    variant='contained' 
                    component='span'
                    color='secondary'
                    fullWidth>
                    Foto
                  </Button>
                </label>
              </FormControl>
            </Grid>
            <Grid
                item
                xs={12}
                sm={12}
                md={2}>
                <Button
                  type='button'
                  variant='contained'
                  color='secondary'
                  fullWidth
                  onClick={addRowForm}>
                  Frase
                </Button>
              </Grid>
          </Grid>
          {
            rowsFrases.map((item, index)  => (
              <FormFrase
                frase={item.frase}
                calificacion={item.calificacion}
                key={index}
                deleteRow={() => deleteFormRow(index)}
                changeRow={(name, value) => changeRow(index, name, value)} />
            ))
          }
        </DialogContent>
        <DialogActions>
          <LoadingButton
            type='submit' 
            loading={loadingForm}
            variant='contained'>
            Registrar
          </LoadingButton>
          <Button
            variant='contained'
            color='secondary'
            type='button'>
            Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export { ModalPersonaje };