import React, { useContext, useEffect, useState } from 'react';
import style from './OnlinePayment.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { userContext } from '../../Context/userContext';
import { Helmet } from 'react-helmet';
import { cartContext } from '../../Context/cartContext';


export default function OnlinePayment() {

  let { onlinePayment , cartId } = useContext(cartContext);


  let Navigate = useNavigate();

  let phoneRegExp = /^01(?:0|1|2|5)\d{8}$/

  const onSubmit = async values => {
    const currentUrl = window.location.href.split('/').slice(0,3).join('/');
    let response = await onlinePayment(cartId,currentUrl,values);
    window.location.href = response?.data.session.url;
  }




  const validationSchema = yup.object({
    details: yup.string().required('details is require'),
    city: yup.string().required('city is require'),
    phone: yup.string().matches(phoneRegExp, 'phone is invalid').required('Phone is require'),
  })
  let formik = useFormik({
    initialValues: {

      details: '',
      phone: '',
      city: '',

    },
    validationSchema,
    onSubmit
  })


  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>OnlinePayment</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <div className=" w-75 mx-auto py-4">
      <form onSubmit={formik.handleSubmit} className=' w-75 mx-auto py-2'>
        <label className=" mb-2">Details : </label>
        <input
          className='form-control mb-3'
          type='text'
          name='details'
          value={formik.values.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.details && formik.touched.details ? <div className='alert alert-danger mt-2 p-2'>{formik.errors.details}</div> : ''}


        <label className=" mb-2">Phone : </label>
        <input
          className='form-control mb-3'
          type="tel"
          name='phone'
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger mt-2 p-2'>{formik.errors.phone}</div> : ''}


        <label className=" mb-2">City : </label>
        <input
          className='form-control mb-3'
          type="text"
          name='city'
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger mt-2 p-2'>{formik.errors.city}</div> : ''}


        <div className=" d-flex justify-content-between align-items-baseline  ">
          <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white mt-4' type='submit' >Pay now</button>
        </div>
      </form>
    </div>
  </>
}

