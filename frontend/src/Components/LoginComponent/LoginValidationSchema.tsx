import * as Yup from 'yup';

const loginValidationSchema = Yup.object({
    password: Yup.string().min(8, 'Min 8 karakter').required('Zorunlu'),
    email: Yup.string().email('Geçerli bir e-posta girilmelidir').matches(/@(gmail\.com|hotmail\.com|outlook\.com|mail.com)$/, 'Yalnızca gmail veya outlook kullanılabilir.').required('Zorunludur'),
})

export default loginValidationSchema; 