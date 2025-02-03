import * as Yup from 'yup';

const userProfileInfoValidationSchema = Yup.object({
    email: Yup.string().email('Geçerli bir e-posta girilmelidir').matches(/@(gmail\.com|hotmail\.com|outlook\.com|mail\.com)$/, 'Yalnızca gmail veya outlook kullanılabilir.').required('Zorunlu'),
    phoneNum: Yup.string().matches(/^\d+$/, "Sayı olmalı").required("Zorunlu").min(11, 'Min 11 karakter ').max(13, 'Maks 13 karakter')
})

export default userProfileInfoValidationSchema