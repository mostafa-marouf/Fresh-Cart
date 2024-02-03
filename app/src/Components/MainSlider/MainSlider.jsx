import React from 'react';
import style from './MainSlider.module.css';
import Slider1 from '../../Assets/images/slider-image-1.jpeg'
import Slider2 from '../../Assets/images/slider-image-2.jpeg'
import Slider3 from '../../Assets/images/slider-image-3.jpeg'
import img1 from '../../Assets/images/grocery-banner-2.jpeg'
import img2 from '../../Assets/images/slider-2.jpeg'
import Slider from "react-slick";


export default function MainSlider() {

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return <>
    <div className='row mt-3 gx-0   '>
      <div className=' col-md-9 m-auto col-sm-12 '>
        <div className=''>
          <Slider {...settings}>
            <img className={style.handleSlider} src={Slider1} alt="" />
            <img className={style.handleSlider} src={Slider2} alt="" />
            <img className={style.handleSlider} src={Slider3} alt="" />
          </Slider>
        </div>
      </div>
      <div className=' col-md-3  m-auto col-sm-6 '>
        <div className=' d-sm-flex d-md-block justify-content-center'>
          <img src={img1} className={style.handleImg +" "} alt="" />
          <img src={img2} className={style.handleImg} alt="" />
        </div>
      </div>
    </div>
  </>
}
