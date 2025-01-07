import React from 'react'
import Header from './Header/Header'
import Paragraph from './Paragraph/Paragraph'

interface InfoBarProps {
    HTitle: string;
    PTitle: string;
    Alignment: boolean;
}

function InfoBar({ HTitle, PTitle, Alignment }: InfoBarProps) {
    return (
        <div className=' pt-5'>
            <Header Icon={true} Text={HTitle} Align={Alignment} />
            <Paragraph Text={PTitle} Align={Alignment} />
        </div>
    )
}

export default InfoBar