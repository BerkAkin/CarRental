import React, { useEffect, useState } from 'react'
import style from './styles.module.css'
import LandingInfo from '../../Components/LandingInfo/LandingInfo';
import WhyInfo from '../../Components/WhyInfo/WhyInfo'
import ServicesInfo from '../../Components/ServicesInfo/ServicesInfo';
import SimpleSlider from '../../Components/SimpleSlider/SimpleSlider';
import SliderCommentCard from '../../Components/SliderCommentCard/SliderCommentCard';
import apiService from '../../api/apiService';
import { endpoints } from '../../api/apiConfig';
import { useSliderContext } from '../../Contexts/SliderContext';
import groupInThrees from '../../common/GroupSplitter';



function LandingPage() {
  const { sliderError, textData } = useSliderContext();

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, status }: any = await apiService(endpoints.homepage, "GET");
        setData(data);
      }
      catch (err) {
        setError("Anasayfada bir hata meydana geldi. Lütfen yöneticinize başvurun");
        console.error(error);
      }
    }
    fetchData();
  }, []);


  const mainText = data?.mainText?.map((item: any) => item.text) || [];
  const reasons = data?.reasons || [];
  const services = data?.services || [];
  const groupedData = groupInThrees(reasons);
  const groupedService = groupInThrees(services);


  if (error) return <p>{error}</p>

  return (
    <div className={`${style.innerContainerSizing} pt-5`}>

      <LandingInfo Text={mainText} />
      <WhyInfo ImgURL="image1.jpg" Header="Neden Flexper ?" InfoBars={groupedData[0] || []} Align={false} />
      <WhyInfo ImgURL="image2.jpg" InfoBars={groupedData[1] || []} Align={true} />
      <ServicesInfo ServicesLeft={groupedService[0] || []} ServicesRight={groupedService[1] || []} />

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