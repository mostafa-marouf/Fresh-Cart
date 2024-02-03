import React from 'react';
import style from './Caregories.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import Home from '../Home/Home';
import { useNavigate } from 'react-router-dom';
import ImgPopUp from './../ImgPopUp/ImgPopUp';
import Error from './../Error/Error';
import { Helmet } from 'react-helmet';

export default function Caregories() {

  function getCaregories() {
    return axios.get('https://route-ecommerce.onrender.com/api/v1/categories')
  }
  let { data, isError, isLoading } = useQuery('getCaregories', getCaregories)


  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>categories</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    {isLoading ?
      <div className=' loding'>
        <i className='fa fa-spin fa-spinner'></i>
      </div>
      : isError ?
        <Error /> :
        <div className='row m-auto h-25'>
          {data?.data.data.map((ele) => <ImgPopUp key={ele._id} img={data} ele={ele} />)}
        </div>
    }
  </>
}
