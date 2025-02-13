import Paragraph from '../../WhyInfo/InfoBar/Paragraph/Paragraph';
import Header from '../../WhyInfo/InfoBar/Header/Header';
import { selectIcon } from '../../../common/IconPack';

interface ServiceCardProps {
    HeaderTxt: string;
    ParagraphTxt: string;
    Icon: string;
}


function ServiceCard({ HeaderTxt, ParagraphTxt, Icon }: ServiceCardProps) {

    const icon = selectIcon(Icon, 50);

    return (
        <>
            <div className='my-4'>
                <div className='h-25 justify-content-center row'>{icon}</div>
                <div className='h-25 my-2 row'><Header Align="center" Text={HeaderTxt} /></div>
                <div className='h-50 row'><Paragraph Align="center" Text={ParagraphTxt} /></div>
            </div>
        </>
    )
}

export default ServiceCard