import * as yup from 'yup'

export const userSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(15, 'El nombre debe ser menor a 15 caracteres')
    .required('Requerido'),
  lastName: yup
    .string()
    .max(150, 'El nombre debe ser menor a 15 caracteres')
    .required('Requerido'),
  email: yup.string().email('Email inválido').required('Requerido'),
  dni: yup
    .number()
    .integer('Ingrese el DNI sin puntos')
    .positive('Debe ser un número mayor a 0')
    .test('len', 'Máximo 8 números', (val) => {
      return val ? val.toString().length <= 8 : true
    })
    .test('len', 'Mínimo 7 números', (val) => {
      return val ? val.toString().length >= 7 : true
    })
    .required('Requerido'),
    gender: yup.string().required('Requerido'),
})
