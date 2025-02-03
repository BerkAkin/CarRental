import * as Yup from 'yup';

const userCommentValidationSchema = Yup.object({
    content: Yup.string().max(500, "Yorum maks 500 karakter")
})

export default userCommentValidationSchema;