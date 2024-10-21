import * as yup from 'yup';

export const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
  password: yup.string().required('Informe a senha').min(8, 'A senha deve ter no mínimo 8 caracteres'),
  passwordConfirmation: yup.string().required('Informe a confirmação da senha')
});