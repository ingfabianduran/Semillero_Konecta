import * as yup from 'yup';

const validationComentario = yup.object({
  comentario: yup
    .string()
    .required()
});

const validationPersonaje = yup.object({
  nombreCompleto: yup
    .string()
    .required(),
});

export { validationComentario, validationPersonaje };