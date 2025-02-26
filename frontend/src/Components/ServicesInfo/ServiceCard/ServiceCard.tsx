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
            <div >
                <div className='justify-content-center row'>
                    {icon}
                </div>
                <div className='row'>
                    <Header Align="center" Text={HeaderTxt} />
                    <Paragraph Align="center" Text={ParagraphTxt} />
                </div>
            </div >
        </>
    )
}

export default ServiceCard