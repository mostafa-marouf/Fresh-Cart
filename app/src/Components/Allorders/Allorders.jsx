import React, { useContext, useEffect } from 'react';
import style from './Allorders.module.css';
import axios from 'axios';
import { cartContext } from '../../Context/cartContext';
import { useQuery } from 'react-query';

export default function Allorders() {

  let{cartId} = useContext(cartContext)

  const getDataOrders = ()=>{
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartId}`)
  }

  let {data} = useQuery('getDataOrders',getDataOrders)


  

  useEffect(() => {
    console.log(data?.data);
  
   
  }, [])
  
  return <>
    <h1>Allorders</h1>
  </>
}
