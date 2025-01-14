export function StatusHandler(status: number, message: string, cb: Function) {
    switch (status) {
        case 200:
            cb(message, "s");
            break;
        case 401:
            cb("İşlem başarısız. Lütfen giriş yapın ya da istenen işlem için yetkiniz olduğundan emin olun", "d")
            break
        case 403:
        case 404:
        case 500:
        case 409:
        default:
            cb(message, "d");
            break;
    }
}
