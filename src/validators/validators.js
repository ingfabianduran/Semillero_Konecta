import * as yup from 'yup';

const validationComentario = yup.object({
  comentario: yup
    .string('Registre el comentario')
    .required('El comentario es requerido')
});

export { validationComentario };