import * as Yup from 'yup';

const forgetValidationSchema = Yup.object({
    email: Yup.string().email('Geçerli bir e-posta girilmelidir').matches(/@(gmail\.com|hotmail\.com|outlook\.com|mail.com)$/, 'Yalnızca gmail veya outlook kullanılabilir.').required('Zorunludur'),
})

export default forgetValidationSchema; 