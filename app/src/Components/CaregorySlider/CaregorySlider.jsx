import React from 'react';
import style from './CaregorySlider.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from "react-slick";

export default function CaregorySlider() {

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 8,
    slidesToScroll: 1, 
    autoplay: true,
    autoplaySpeed: 1500
  };

  const getCaregoryImg = () => {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }
  let { data, isLoading } = useQuery('getCaregoryImg', getCaregoryImg);
  return <>
    {isLoading ? '' :
      <>
      <div className=' mt-3'>
        <Slider {...settings}>
          {data?.data.data.map((ele) => <img key={ele._id} className={style.objectFit}  src={ele.image} />)}
        </Slider>
      </div>
      </>}
  </>
}
