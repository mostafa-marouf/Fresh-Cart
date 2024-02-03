import React, { useContext, useState } from 'react';
import style from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import Error from './../Error/Error';
import Slider from "react-slick";
import { Helmet } from 'react-helmet';
import { cartContext } from './../../Context/cartContext';
import toast, { Toaster } from 'react-hot-toast';


export default function ProductDetails() {


  let { addToCart } = useContext(cartContext);

  const [disabled, setDisabled] = useState(false)
  async function addProductToCart(id) {
    setDisabled(true)
    let response = await addToCart(id);

    if (response?.data.status === 'success') {
      setDisabled(false)
      toast.success('Product Successfully Added!')
    } else {
      setDisabled(false)
      toast.error("This didn't work.")
    }
  }


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToScroll: 1
  }


  let { id } = useParams();
  const getProductDetails = (id) => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  let { isError, isLoading, data } = useQuery('getProductDetails', () => getProductDetails(id));

  return <>
    {isLoading ?
      <div className=' loding'>
        <i className='fa fa-spin fa-spinner'></i>
      </div> : isError ? <Error /> :
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{data?.data.data.title.split(' ').slice(0, 2).join(' ')}</title>
            <link rel="canonical" href="http://mysite.com/example" />
          </Helmet>
          <div className=' row pt-5'>
            <div className='col-lg-3 col-md-5 col-sm-10 m-auto'>
              <div>

                <Slider {...settings}>
                  {/* <img src={data?.data.data.imageCover} alt={data?.data.data.title} className=' w-100' /> */}
                  {data?.data.data.images.map((ele) => <img src={ele} alt={data?.data.data.title} />)}
                </Slider>
              </div>
            </div >
            <div className='col-lg-9 px-4 m-auto col-md-7 col-sm-10   justify-content-center flex-column'>
              <h2 className=' text-main'>{data?.data.data.title.split(' ').slice(0, 3).join(' ')}</h2>
              <h5 className=' py-3'>{data?.data.data.category.name}</h5>
              <p>{data?.data.data.description}</p>
              <div className="d-flex justify-content-between align-items-baseline ">
                <p>{data?.data.data.price} EGP</p>
                <div className=' d-flex align-items-baseline'>
                  <p>{data?.data.data.ratingsAverage}</p>
                  <i className=' fa fa-star star rating-color'></i>
                </div>
              </div>
              <button disabled={disabled} onClick={() => addProductToCart(data?.data.data._id)} className=' btn text-main w-100 mt-2 text-white bg-main'>Add To Cart</button>
              <Toaster />
            </div>
          </div>
        </>
    }
  </>
}
