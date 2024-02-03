
import React, { useContext, useEffect, useState } from 'react';
import style from './Cart.module.css';
import { cartContext } from '../../Context/cartContext';
import { useQuery } from 'react-query';
import Error from './../Error/Error';
import { Link } from 'react-router-dom';

export default function Cart() {


  const { clearUserCart, getCartData, removeSpecificCartItem, updateCartProductQuantity, setCartId } = useContext(cartContext);

  
  let { data, isError, isLoading, refetch } = useQuery('getCartData', getCartData);

  useEffect(() => {
    if (data && data.data && data.data.data) {
      setCartId(data.data.data._id);
    }
  }, [data]);


  const [isRemoveing, setIsRemoveing] = useState(false)
  const [isUpdateing, setIsUpdateing] = useState(false)


  const removeSpecificCartItemFunc = async (id) => {
    setIsRemoveing(true)
    await removeSpecificCartItem(id);
    refetch()
    setIsRemoveing(false)

  };
  const updateCartProductQuantityFunc = async (count, id) => {
    setIsUpdateing(true)
    await updateCartProductQuantity(count, id);
    refetch()
    setIsUpdateing(false)

  }

  const clearUserCartFunc = async () => {
    await clearUserCart()
    refetch();
  };




  return <>
    <div className='w-75 my-2 mx-auto p-3 bg-main-light'>
      <h1>Shoppong Cart</h1>
      {isLoading ?
        <div className='loading'>
          <i className='fa fa-spin fa-spinner'></i>
        </div>
        : <>
          {isError ? <Error /> : <>
            {data?.data ? <>

              <h4 className=' h6 text-main fw-bolder'>Cart Items : {data?.data.numOfCartItems} </h4>
              <h4 className=' h6 text-main fw-bolder'>Total Cart Price  : {data?.data.data.totalCartPrice} EGP</h4>

              {
                data?.data.data.products.map((ele) => {
                  return <div key={ele._id} className=' row border-bottom p-3 mx-2'>
                    <div className='col-md-3  '>
                      <img src={ele.product.imageCover} className=' w-100 ' alt="" />
                    </div>
                    <div className=' col-md-9 d-flex justify-content-between align-items-center'>
                      <div>
                        <h3 className=' h6'>{ele.product.title.split(' ').slice(0, 3).join(' ')}</h3>
                        <h6 className=' text-main'>price : {ele.price}</h6>
                        {isRemoveing ?
                          <button disabled={true} className='btn font-sm p-1 border-0 btn-outline-danger mt-3'> <i className="fa-solid fa-hourglass-half"></i></button>
                          : <button onClick={() => removeSpecificCartItemFunc(ele.product._id)} className='btn font-sm p-1 border-0 btn-outline-danger mt-3'><i className=' font-sm fa fa-trash'></i> Remove</button>
                        }
                      </div>
                      <div className=' d-flex justify-content-center align-items-center'>
                        {isUpdateing ?
                          <button disabled={true} className='border-main  btn btn-outline-success'><i className='fa fa-spin fa-spinner'></i></button>
                          :
                          <button onClick={() => updateCartProductQuantityFunc(ele.count + 1, ele.product._id)} className='border-main  btn btn-outline-success'>+</button>
                        }
                        <span className=' mx-2' >{ele.count}</span>
                        {isUpdateing ?
                          <button disabled={true} className='border-main  btn btn-outline-success'><i className='fa fa-spin fa-spinner'></i></button>
                          :
                          <button onClick={() => updateCartProductQuantityFunc(ele.count - 1, ele.product._id)} className='border-main  btn btn-outline-success'>-</button>
                        }
                      </div>
                    </div>

                  </div>


                })

              }
              <button className='btn btn-danger  mt-2' onClick={clearUserCartFunc}>Clear user cart</button>
              <button className='btn bg-main  mx-5 mt-2' >
              <Link className='text-white a' to='/onlinePayment'>Online payment</Link>
              
              </button>
            </> : <>

              <h4 className=' h6 text-main fw-bolder'>Cart Items :0 </h4>
              <h4 className=' h6 text-main fw-bolder'>Total Cart Price  : 0 EGP</h4>
            </>}
          </>}
        </>
      }
    </div>
  </>
}
