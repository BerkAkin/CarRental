import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string().required('Zorunlu').min(3, 'Min 3 karakter ').max(25, 'Maks 25 karakter'),
    surname: Yup.string().required('Zorunlu').min(2, 'Min 2 karakter').max(25, 'Maks 25 karakter'),
    email: Yup.string().email('Geçerli bir e-posta girilmelidir').matches(/@(gmail\.com|hotmail\.com|outlook\.com)$/, 'Yalnızca Gmail veya Outlook kullanılabilir.').required('Zorunlu'),
    phone: Yup.string().matches(/^\d+$/, "Sayı olmalı").required("Zorunlu").min(11, 'Min 11 karakter olabilir').max(13, 'Maks 13 karakter olabilir'),
    platform: Yup.string().required('Zorunlu'),
    permission: Yup.string().required('Zorunlu'),
    otherPlatform: Yup.string().when('platform', {
        is: 'other',
        then: (schema) => Yup.string().not(["belirtin"], "İfade yanlış").required("Lütfen bir platform adı girin"),

    }),
})

export default validationSchema; 