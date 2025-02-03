import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string().required('Zorunlu').min(3, 'Min 3 karakter '),
    surname: Yup.string().required('Zorunlu').min(2, 'Min 2 karakter'),
    email: Yup.string().email('Geçerli bir e-posta girilmelidir').required('Zorunlu'),
    phone: Yup.number().required('Zorunlu').typeError("Sayı olmalı"),
    platform: Yup.string().required('Zorunlu'),
    permission: Yup.string().required('Zorunlu'),
    otherPlatform: Yup.string().when('platform', {
        is: 'other',
        then: (schema) => Yup.string().not(["belirtin"], "İfade yanlış").required("Lütfen bir platform adı girin"),

    }),
})

export default validationSchema; 