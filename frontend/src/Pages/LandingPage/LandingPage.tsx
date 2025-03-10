import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import LandingInfo from '../../Components/LandingInfo/LandingInfo';
import WhyInfo from '../../Components/WhyInfo/WhyInfo'
import ServicesInfo from '../../Components/ServicesInfo/ServicesInfo';
import SimpleSlider from '../../Components/SimpleSlider/SimpleSlider';
import SliderCommentCard from '../../Components/SliderCommentCard/SliderCommentCard';
import apiService from '../../api/apiService';
import { useSliderContext } from '../../Contexts/SliderContext';
import groupInThrees from '../../common/GroupSplitter';



function LandingPage() {
  const { sliderError, textData } = useSliderContext();

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, status }: any = await apiService(process.env.REACT_APP_BASE_API_HOMEPAGE_ENDPOINT, "GET");
        setData(data);
      }
      catch (err) {
        setError("Anasayfada bir hata meydana geldi. Lütfen yöneticinize başvurun");
        console.error(error);
      }
      finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);


  const mainText = data?.mainText?.map((item: any) => item.text) || [];
  const reasons = data?.reasons || [];
  const services = data?.services || [];
  const groupedData = groupInThrees(reasons);
  const groupedService = groupInThrees(services);


  if (error) return (<div className={`${styles.skeletonContainer}`}>{error}</div>)


  return (
    <div className={`${styles.innerContainerSizing} py-5`}>
      <LandingInfo isLoading={isLoading} Text={mainText} />
      <WhyInfo isLoading={isLoading} ImgURL={process.env.REACT_APP_STATIC_IMAGE + "whyone.jpg"} Header="Neden Flexper ?" InfoBars={groupedData[0] || []} Align={false} />
      <WhyInfo isLoading={isLoading} ImgURL={process.env.REACT_APP_STATIC_IMAGE + "whytwo.jpg"} InfoBars={groupedData[1] || []} Align={true} />
      <ServicesInfo isLoading={isLoading} ServicesLeft={groupedService[0] || []} ServicesRight={groupedService[1] || []} />

      <div className='my-3 pt-5'>
        {
          sliderError ?? { sliderError }
        }

        {
          <SimpleSlider slidesToShow={3} header='Flexper için neler dediler?' items={textData || []} renderFunction={(item) => (
            <SliderCommentCard Content={item.content} Username={item.userName} StarCount={item.starCount} UserType={item.userType} />
          )} />
        }

      </div>


    </div>
  )
}

export default LandingPage