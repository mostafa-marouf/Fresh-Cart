import React, { useContext, useEffect, useState } from 'react';
import style from './Login.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { userContext } from '../../Context/userContext';
import { Helmet } from 'react-helmet';

export default function Register() {

  let { setUserToken} = useContext(userContext);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDone, setIsDone] = useState('no')

  let Navigate = useNavigate();

  let passwordRegExp = /^.{6,}$/

  const onSubmit = async values => {
    setLoading(true)
    let data = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setLoading(false)
        setSuccess(null)
        setError(err.response.data.message)
        
        
      })
      if (data?.data.message === 'success') {
      setIsDone('yes');
      setLoading(false);
      setError(null);
      setSuccess('Login is succesed');
      localStorage.setItem('userToken',data.data.token);
      setUserToken(data.data.token);      
    }
  }
  
  useEffect(() => {
    if (isDone === 'yes') {
      const timer = setTimeout(() => { 
        Navigate('/')  
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isDone]);
  

  const validationSchema = yup.object({
    email: yup.string().email('email is invalid').required('email is require'),
    password: yup.string().matches(passwordRegExp, 'Password must be at least 6 characters long').required('password is require'),
  })
  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit
  })


  return <>
   <Helmet>
      <meta charSet="utf-8" />
      <title>login</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <div className=" w-75 mx-auto py-4">

      {error !== null ? <div className=" alert alert-danger">{error}</div> : ''}
      {success !== null ? <div className=" alert alert-success">{success}</div> : ''}

      <form onSubmit={formik.handleSubmit} className=' w-75 mx-auto py-2'>
        <label className=" mb-2">Email : </label>
        <input
          className='form-control mb-3'
          type="email"
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger mt-2 p-2'>{formik.errors.email}</div> : ''}


        <label className=" mb-2">Password : </label>
        <input
          className='form-control mb-3'
          type="password"
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger mt-2 p-2'>{formik.errors.password}</div> : ''}



        <div className=" d-flex justify-content-between align-items-baseline  ">
        {loading ?
          <button className='btn bg-main text-white mt-4' disabled='false'>
            <i className=' fa fa-spin fa-spinner'></i>

          </button> :
          <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white mt-4' type='submit' >Login</button>
        }

          <p className=' '> Click <Link className='text-info a' to='/register'>here</Link> if you don't have an account. </p>
        </div>
        
      </form>

    </div>
  </>
}
