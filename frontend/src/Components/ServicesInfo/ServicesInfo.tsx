import ServiceCard from './ServiceCard/ServiceCard'
import Image from '../../Components/Image/Image'
import styles from './styles.module.css'
import Skeleton from '../Skeletons/Skeleton/Skeleton';


interface IServiceInfoIcon {
    id: number;
    name: string;
}
interface serviceInfoProps {
    ServicesLeft: { title: string, content: string, icon: IServiceInfoIcon }[]
    ServicesRight: { title: string, content: string, icon: IServiceInfoIcon }[]
    isLoading: boolean;
}

function ServicesInfo({ ServicesLeft, ServicesRight, isLoading }: serviceInfoProps) {

    return (
        <>
            <div className='container mt-5 pt-5 '>

                <div className='row '>

                    <div className='col-lg-3 col-12'>
                        {isLoading ?
                            <Skeleton />
                            :
                            <>
                                {ServicesLeft.map((data, index) => (
                                    <div key={index} className={`${styles.reasonTabHeight} row`}>
                                        <ServiceCard HeaderTxt={data.title} Icon={data.icon.name} ParagraphTxt={data.content} />
                                    </div>
                                ))}
                            </>}
                    </div>

                    <div className='col-lg-6 col-12 d-flex align-items-center my-5'>
                        <Image URL={"/static/service.png"} Width="620px" Height="500" />
                    </div>

                    <div className='col-lg-3 col-12 '>
                        {isLoading ?
                            <Skeleton />
                            :
                            <>
                                {ServicesRight.map((data, index) => (
                                    <div key={index} className={`${styles.reasonTabHeight} row`}>
                                        <ServiceCard HeaderTxt={data.title} Icon={data.icon.name} ParagraphTxt={data.content} />
                                    </div>
                                ))}
                            </>}
                    </div>

                </div>

            </div>
        </>
    )
}

export default ServicesInfo