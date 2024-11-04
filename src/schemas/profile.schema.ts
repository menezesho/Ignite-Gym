import * as yup from 'yup';

export const profileSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  email: yup.string(),
  currentPassword: yup.string().min(8, 'A senha deve ter no mínimo 8 caracteres').nullable().transform((value) => !!value ? value : null),
  newPassword: yup.string().min(8, 'A senha deve ter no mínimo 8 caracteres').nullable().transform((value) => !!value ? value : null),
  newPasswordConfirmation: yup
    .string()
    .nullable()
    .transform((value) => !!value ? value : null)
    .oneOf([yup.ref('newPassword')], 'A confirmação da senha está incorreta')
});