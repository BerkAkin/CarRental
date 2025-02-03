import { format, formatISO, parseISO } from "date-fns";
import { tr } from "date-fns/locale";

const formatDate = (dateStr: string): string => {
    const formattedDate = format(formatISO(dateStr), "dd/MM/yyyy HH:mm", { locale: tr });
    return formattedDate;

}

export default formatDate;