import React, { useEffect, useState } from 'react'
import style from './styles.module.css'
import LandingInfo from './LandingInfo/LandingInfo'
import WhyInfo from './WhyInfo/WhyInfo'
import images from '../../../assets/images/WhyImages/images';
import ServicesInfo from './ServicesInfo/ServicesInfo';
import Slider from '../../SimpleSlider/SimpleSlider';
import SliderCommentCard from '../../SliderCommentCard/SliderCommentCard';
import items from '../../../common/sliderComment'
import apiService from '../../../api/apiService';
import { endpoints } from '../../../api/apiConfig';


function LandingContainer() {

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


  if (loading) return <p>Yükleniyor</p>
  if (error) return <p>{error}</p>

  const mainText = data?.mainText?.map((item: any) => item.text) || [];
  const reasons = data?.reasons || [];
  const services = data?.services || [];

  const groupInThrees = (data: any) => {
    const grouped = [];
    for (let i = 0; i < data.length; i += 3) {
      grouped.push(data.slice(i, i + 3));
    }
    return grouped;
  }

  const groupedData = groupInThrees(reasons);
  const groupedService = groupInThrees(services);


  return (
    <div className={`${style.innerContainerSizing} pt-5`}>

      <LandingInfo Text={mainText} />
      <WhyInfo ImgURL="image1.jpg" Header="Neden Flexper ?" InfoBars={groupedData[0] || []} Align={false} />
      <WhyInfo ImgURL="image2.jpg" InfoBars={groupedData[1] || []} Align={true} />
      <ServicesInfo ServicesLeft={groupedService[0] || []} ServicesRight={groupedService[1] || []} />
      <Slider slidesToShow={3} header='Flexper için neler dediler?' items={items} renderItem={(item) => (
        <SliderCommentCard Comment={item.Comment} Person={item.Person} StarCount={item.StarCount} Type={item.Type} />
      )} />

    </div>
  )
}

export default LandingContainer