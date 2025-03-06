import * as Yup from "yup";

const modelEditValidationSchema = Yup.object({
    brandName: Yup.string().max(40, "Maks 40 karakter").required("Zorunlu"),
    modelName: Yup.string().max(50, "Maks 50 karakter").required("Zorunlu"),
    fuelType: Yup.object({
        id: Yup.number().required("Yakıt tipi zorunludur.").max(20),
    }),
    gearType: Yup.object({
        id: Yup.number().required("Şanzıman tipi zorunludur.").max(20),
    }),
    carType: Yup.object({
        id: Yup.number().required("Araç tipi zorunludur.").max(20),
    }),
    description: Yup.string().max(255, "Maks 255 karakter").required("Zorunlu"),
    personCount: Yup.string().matches(/^\d+$/, "Sayı olmalı").max(10, "Maks 10").required("Zorunlu"),
    luggageCount: Yup.string().matches(/^\d+$/, "Sayı olmalı").max(15, "Maks 15").required("Zorunlu"),
    doorCount: Yup.string().matches(/^\d+$/, "Sayı olmalı").max(6, "Maks 6").required("Zorunlu"),
    price: Yup.string().matches(/^\d+$/, "Sadece sayı olmalıdır").required("Zorunlu"),
    otherServices: Yup.string().max(500, "Maks 500 karakter"),
    otherFeatures: Yup.string().max(500, "Maks 500 karakter"),
})

export default modelEditValidationSchema;