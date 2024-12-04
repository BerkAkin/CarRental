import React, { useEffect, useState } from 'react'
import style from './styles.module.css'
import LandingInfo from './LandingInfo/LandingInfo'
import WhyInfo from './WhyInfo/WhyInfo'
import images from '../../../assets/images/WhyImages/images';
import ServicesInfo from './ServicesInfo/ServicesInfo';
import SimpleSlider from '../../SimpleSlider/SimpleSlider';
import SliderCommentCard from '../../SliderCommentCard/SliderCommentCard';
import apiService from '../../../api/apiService';
import { endpoints } from '../../../api/apiConfig';
import { useSliderContext } from '../../../Contexts/SliderContext';
import groupInThrees from '../../../common/GroupSplitter';



function LandingContainer() {
  const { textData } = useSliderContext();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService(endpoints.homepage, "GET");
        setData(data);
        console.log(data);
      }
      catch (err) {

        setError(`${err}`);
      }
      finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);


  const mainText = data?.mainText?.map((item: any) => item.text) || [];
  const reasons = data?.reasons || [];
  const services = data?.services || [];
  const groupedData = groupInThrees(reasons);
  const groupedService = groupInThrees(services);


  if (loading) return <p>Yükleniyor</p>
  if (error) return <p>{error}</p>

  return (
    <div className={`${style.innerContainerSizing} pt-5`}>

      <LandingInfo Text={mainText} />
      <WhyInfo ImgURL="image1.jpg" Header="Neden Flexper ?" InfoBars={groupedData[0] || []} Align={false} />
      <WhyInfo ImgURL="image2.jpg" InfoBars={groupedData[1] || []} Align={true} />
      <ServicesInfo ServicesLeft={groupedService[0] || []} ServicesRight={groupedService[1] || []} />

      <SimpleSlider slidesToShow={3} header='Flexper için neler dediler?' items={textData || []} renderFunction={(item) => (
        <SliderCommentCard Content={item.content} Username={item.userName} StarCount={item.starCount} UserType={item.userType} />
      )} />


    </div>
  )
}

export default LandingContainer