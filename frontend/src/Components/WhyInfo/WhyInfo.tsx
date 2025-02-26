import React from 'react'
import Image from '../Image/Image'
import InfoBar from './InfoBar/InfoBar'

interface WhyInfoProp {
    Align: true | false;
    InfoBars: { title: string, content: string }[];
    ImgURL: string;
    Header?: string;
}

function WhyInfo({ Align, InfoBars, ImgURL, Header }: WhyInfoProp) {
    return (
        <>
            <div className='container pt-5'>

                <div className='row mt-5'>

                    <div className={`col-lg-6 col-12 ${Align === true ? '' : 'order-2'}`}>
                        <div className='row'>
                            <div className='col-12'>
                                <h1 style={{ fontSize: "4rem" }} className='text-md-end text-center'>{Header}</h1>
                            </div>
                        </div>
                        {InfoBars.map((info, index) => (
                            <InfoBar key={index} Alignment={Align} HTitle={info.title} PTitle={info.content} />
                        ))}
                    </div>
                    <div className={`col-lg-6 col-12 d-none d-lg-block ${Align === true ? 'order-2' : ''}`}>
                        <Image Height='660' Width='660' URL={ImgURL} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default WhyInfo