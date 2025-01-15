import React from 'react'
import styles from './styles.module.css'
import Paragraph from '../../WhyInfo/InfoBar/Paragraph/Paragraph';
import Header from '../../WhyInfo/InfoBar/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface ServiceCardProps {
    HeaderTxt: string;
    ParagraphTxt: string;
    Icon: string;
}


function ServiceCard({ HeaderTxt, ParagraphTxt, Icon }: ServiceCardProps) {
    const newIcon = Icon.toLowerCase() as IconProp;
    return (
        <>
            <div className='my-4'>
                <div className='h-25 justify-content-center row'>{<FontAwesomeIcon fontSize={50} icon={newIcon} />}</div>
                <div className='h-25 my-2 row'><Header Align="center" Text={HeaderTxt} /></div>
                <div className='h-50 row'><Paragraph Align="center" Text={ParagraphTxt} /></div>
            </div>
        </>
    )
}

export default ServiceCard