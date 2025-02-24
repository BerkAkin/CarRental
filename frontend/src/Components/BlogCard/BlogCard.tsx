import styles from './styles.module.css'
import Image from '../Image/Image';
import CategoryPill from '../CategoryPill/CategoryPill';
import ListElement from '../ListElement/ListElement';

interface BlogCardProps {
    Id: Number;
    ImageUrl: string;
    Title: string;
    Description: string;
    Date: string;
}

function BlogCard({ Id, ImageUrl, Title, Description, Date }: BlogCardProps) {
    return (
        <>
            <div className={`${styles.cardBg} container border`}>
                <div className={`${styles.cardInner} row`}>
                    <div className='col-4 border-end overflow-hidden'>
                        <Image URL={""} Width='380' />
                    </div>
                    <div className='col-8'>
                        <div className='row h-25'>
                            <div className='col-12 d-flex align-items-center'>
                                <h2 className='pt-1 mt-2 '>{Title} </h2>
                                <div className='pt-2 mt-3 ps-3'><CategoryPill Text='Araçlar' /></div>

                            </div>
                        </div>
                        <div className='row h-50'>
                            <div className='col-12'>
                                <p className={`pt-3 ps-1 ${styles.descText}`}>{Description}</p>
                            </div>

                        </div>
                        <div className='row h-25'>
                            <div className='col-4  d-flex align-items-end'>
                                <p className={`pt-1 ps-1 ${styles.DateText}`}>{Date}</p>

                            </div>
                            <div className='col-8 d-flex justify-content-end align-items-center'>
                                <div className={`${styles.btnBg}`}>
                                    <ListElement href={`Blog/${Id}`} text={"Devamını Oku"} color='White' hoverColor='White' boldness='500' isHover={true} />
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default BlogCard