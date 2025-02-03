import * as Yup from "yup";

const mainTextValidation = Yup.object({
    text: Yup.string().max(500, "Maks 500 karakter")
})

export const reasonTextValidation = Yup.object({
    title: Yup.string().max(35, "Başlık Maks 35 karakter"),
    content: Yup.string().max(255, "İçerik Maks 255 karakter")
})

export const serviceTextValidation = Yup.object({
    title: Yup.string().max(35, "Başlık Maks 35 karakter"),
    content: Yup.string().max(255, "İçerik Maks 255 karakter"),
    icon: Yup.string()
})


export default mainTextValidation