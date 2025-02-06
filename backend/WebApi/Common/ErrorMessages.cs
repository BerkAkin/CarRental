namespace WebApi.Common
{
    public static class ErrorMessages
    {
        public const string DATABASE_ERROR = "Veritabanında hata meydana geldi";

        public const string FAVORITE_NOT_FOUND = "Favori bulunamadı";
        public const string FAVORITES_NOT_FOUND = "Favoriler bulunamadı";
        public const string FAVORITE_ALREADY_EXISTS = "Araç zaten favorilere eklenmiş";
        public const string FAVORITE_DELETE_FAIL = "Araç favorilerden zaten kaldırılmış";
        public const string NO_LOGGED_IN_USER = "Giriş yapmış bir kullanıcı yok";

        public const string NO_USER_OR_REFRESH_TOKEN = "Kullanıcı bulunamadı veya refresh token geçersiz";
        public const string REFRESH_TOKEN_EXPIRED_LOGIN_NEEDED = "Refresh token süresi dolmuş. Yeniden giriş yapılmalı";
        public const string USER_NOT_FOUND = "Kullanıcı bulunamadı";
        public const string USERS_NOT_FOUND = "Kullanıcılar bulunamadı";
        public const string USER_UPDATE_FAIL = "Kullanıcı güncellenemedi";
        public const string USER_DELETE_FAIL = "Kullanıcı silinemedi";
        public const string ACTIVATE_USER_FAIL = "Kullanıcı aktive edilemedi";
        public const string PASSWORD_ERROR = "Girilen parola yanlış";
        public const string PASSWORD_TOKEN_RESET_ERROR = "Geçersiz veya süresi dolmuş token. Lütfen yeniden sıfırlama isteği oluşturun";
        public const string EMAIL_EXISTS = "Bu E-mail adresi zaten mevcut";
        public const string EMAIL_DOES_NOT_EXISTS = "Bu E-mail mevcut değil";
        public const string REGISTER_FAILED_EMPTY_INPUT = "Kayıt başarısız. Girilen bilgiler boş olamaz";

        public const string COMMENTS_NOT_FOUND = "Yorumlar bulunamadı";
        public const string COMMENT_NOT_FOUND = "Yorum bulunamadı";
        public const string COMMENT_ALREADY_ACCEPTED = "Yorum bulunamadı veya zaten onaylanmış";
        public const string COMMENT_ALREADY_REFUSED = "Yorum bulunamadı veya zaten reddedilmiş";
        public const string LATEST_COMMENT_NOT_FOUND = "Son yorumlar alınamadı";
        public const string COMMENT_UPDATE_FAIL = "Güncellencek yorum mevcut değil";

        public const string MODELS_NOT_FOUND = "Modeller bulunamadı";
        public const string MODEL_NOT_FOUND = "Model bulunamadı";
        public const string MODELS_SUMMARY_NOT_FOUND = "Model özetleri bulunamadı";


        public const string GENERALS_NOT_FOUND = "Veriler bulunamadı";
        public const string GENERAL_NOT_FOUND = "Veri bulunamadı";
        public const string GENERAL_UPDATE_FAIL = "Veri güncellenemedi";
        public const string GENERAL_DELETE_FAIL = "Veri silinemedi";


        public const string EMAIL_CANNOT_SEND = "E-Posta gönderilemedi";


    }
}