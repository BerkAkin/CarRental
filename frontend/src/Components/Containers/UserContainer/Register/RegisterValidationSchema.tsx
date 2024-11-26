import * as Yup from 'yup';

const registerValidationSchema = Yup.object({
    password: Yup.string().required('Zorunludur').min(8, 'En az 8 karakter olmalıdır'),
    email: Yup.string().email('Geçerli bir e-posta girilmelidir').required('Zorunludur'),
    name: Yup.string().required("Zorunludur").max(25, 'En fazla 25 karakter olabilir'),
    surname: Yup.string().required("Zorunludur").max(25, 'En fazla 25 karakter olabilir'),
    phoneNum: Yup.string().required("Zorunludur").min(11, 'En az 11 karakter olabilir').max(13, 'En fazla 13 karakter olabilir')

})

export default registerValidationSchema; 