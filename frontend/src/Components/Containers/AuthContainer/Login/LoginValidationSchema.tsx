import * as Yup from 'yup';

const loginValidationSchema = Yup.object({
    password: Yup.string().required('Zorunludur'),
    email: Yup.string().email('Geçerli bir e-posta girilmelidir').required('Zorunludur'),
})

export default loginValidationSchema; 