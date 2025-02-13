import { IconDefinition, faCar, faParking, faGasPump, faRoad, faKey, faHandSparkles, faGauge, faBattery, faTrafficLight, faMoneyBill, faLocationPin, faWrench, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IIconMap {
    [key: string]: IconDefinition;
}

const iconMap: IIconMap = {
    "faCar": faCar,
    "faParking": faParking,
    "faGasPump": faGasPump,
    "faRoad": faRoad,
    "faKey": faKey,
    "faHandSparkles": faHandSparkles,
    "faGauge": faGauge,
    "faBattery": faBattery,
    "faTrafficLight": faTrafficLight,
    "faMoneyBill": faMoneyBill,
    "faLocationPin": faLocationPin,
    "faWrench": faWrench,
    "faEdit": faEdit
}

export const selectIcon = (iconName: string, size: number) => {
    const icon = iconMap[iconName];

    if (!icon) {
        console.warn(`Uyarı: "${iconName}" adlı ikon bulunamadı!`);
        return null;
    }

    return <FontAwesomeIcon fontSize={size} icon={icon} />
}