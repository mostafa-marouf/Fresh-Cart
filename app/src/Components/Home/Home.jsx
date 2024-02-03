import React, { useContext } from 'react';
import style from './Home.module.css';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import CaregorySlider from '../CaregorySlider/CaregorySlider';
import MainSlider from './../MainSlider/MainSlider';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';


export default function Home() {


  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>freach cart</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    
    
    <>
    <MainSlider />
    <CaregorySlider />
    <FeaturedProducts />
    </>

  </>
}
