import React, { useContext, useState } from 'react';
import style from './FeaturedProducts.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import Error from '../Error/Error';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/cartContext';
import toast, { Toaster } from 'react-hot-toast';



export default function FeaturedProducts() {
  let { addToCart } = useContext(cartContext)


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


  const getFeaturedProduct = () => {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');

  }
  let { isError, isLoading, data } = useQuery('getFeaturedProduct', getFeaturedProduct);
  return <>
    {isLoading ?
      <div className=' loding'>
        <i className='fa fa-spin fa-spinner'></i>
      </div> :
      <>
        {isError ? <Error /> :
          <>
            <div className='mt-4 row'>
              {data?.data.data.map((ele) => {
                return <div key={ele._id} className="m-auto col-xl-3 col-lg-4 col-md-5 col-sm-6 col-xxl-2  ">
                  <div className="product cursor-pointer   py-3 px-2">
                    <Link to={`/productdetails/${ele.id}`} >
                      <img src={ele.imageCover} alt={ele.title} className='w-100' />
                      <h2 className=' h4'>{ele.title.split(' ').slice(0, 2).join(' ')}</h2>
                      <div className="d-flex justify-content-between align-items-baseline ">
                        <p>{ele.price}EGP</p>
                        <div className=' d-flex align-items-baseline'>
                          <p>{ele.ratingsAverage}</p>
                          <i className=' fa fa-star star rating-color'></i>
                        </div>
                      </div>
                    </Link>
                    <button disabled={disabled} onClick={() => addProductToCart(ele._id)} className=' btn text-white bg-main w-100'>Add to cart</button>
                    <Toaster />
                  </div>
                </div>
              })}
            </div>
          </>}
      </>
    }
  </>
}


