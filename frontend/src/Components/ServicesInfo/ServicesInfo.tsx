import React from 'react'
import styles from './styles.module.css'
import ServiceCard from './ServiceCard/ServiceCard'
import { faCar, faGasPump, faHandSparkles, faKey, faParking, faRoad } from '@fortawesome/free-solid-svg-icons'
import img from '../../assets/images/ServiceImages/images'
import Image from '../../Components/Image/Image'

interface serviceInfoProps {
    ServicesLeft: { title: string, content: string, icon: string }[]
    ServicesRight: { title: string, content: string, icon: string }[]
}

function ServicesInfo({ ServicesLeft, ServicesRight }: serviceInfoProps) {
    return (
        <>
            <div className='container mt-5 pt-5 '>

                <div className='row'>

                    <div className='col-3 d-flex flex-column justify-content-between'>
                        {ServicesLeft.map((data, index) => (
                            <div key={index} className='row '>
                                <ServiceCard HeaderTxt={data.title} Icon={data.icon} ParagraphTxt={data.content} />
                            </div>
                        ))}
                    </div>

                    <div className='col-6 d-flex align-items-center '>
                        <div className='container-fluid '><Image URL={img.img} Width="620px" Height="500" /></div>
                    </div>

                    <div className='col-3'>
                        {ServicesRight.map((data, index) => (
                            <div key={index} className='row '>
                                <ServiceCard HeaderTxt={data.title} Icon={data.icon} ParagraphTxt={data.content} />
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </>
    )
}

export default ServicesInfo