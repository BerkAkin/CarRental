import * as Yup from 'yup';

const registerValidationSchema = Yup.object({
    password: Yup.string().required('Zorunlu').min(8, 'Min 8 karakter olmalıdır'),
    email: Yup.string().email('Geçerli bir e-posta girilmelidir').matches(/@(gmail\.com|hotmail\.com|outlook\.com)$/, 'Yalnızca Gmail veya Outlook kullanılabilir.').required('Zorunlu'),
    name: Yup.string().required("Zorunlu").max(25, 'Maks 25 karakter'),
    surname: Yup.string().required("Zorunlu").max(25, 'Maks 25 karakter'),
    phoneNum: Yup.string().matches(/^\d+$/, "Sayı olmalı").required("Zorunlu").min(11, 'Min 11 karakter olabilir').max(13, 'Maks 13 karakter olabilir')

})

export default registerValidationSchema; 