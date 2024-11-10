import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string().required('İsim Zorunludur').min(3, 'İsim en az 3 karakter olmalı'),
    surname: Yup.string().required('Soyisim Zorunludur').min(2, 'Soyisim en az 2 karakter olmalı'),
    email: Yup.string().email('Geçerli bir e-posta girilmelidir').required('E-Posta Zorunludur'),
    phone: Yup.number().required('Telefon Numarası Zorunludur').typeError("Telefon Numarası Sayı Olmalıdır"),
    platform: Yup.string().required('Platform Zorunludur'),
    permission: Yup.string().required('İzin Zorunludur'),
    otherPlatform: Yup.string().when('platform', {
        is: 'other',
        then: (schema) => Yup.string().not(["belirtin"], "İfade yanlış").required("Lütfen bir platform adı girin"),

    }),
})

export default validationSchema; 