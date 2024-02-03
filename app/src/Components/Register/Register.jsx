import React, { useEffect, useState } from 'react';
import style from './Register.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Register() {

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDone, setIsDone] = useState('no')

  let Navigate = useNavigate();

  let phoneRegExp = /^01(?:0|1|2|5)\d{8}$/
  let passwordRegExp =  /^.{6,}$/

  const onSubmit = async values => {
    setLoading(true)
    let data = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setLoading(false)
        setSuccess(null)
        setError(err.response.data.message)


      })
    if (data?.data.message === 'success') {
      setIsDone('yes');
      setLoading(false)
      setError(null);
      setSuccess('Register is succesed');

    }
  }

  useEffect(() => {
    if (isDone === 'yes') {
      const timer = setTimeout(() => {
        Navigate('/login')
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isDone]);
  const validationSchema = yup.object({
    name: yup.string().min(3, 'name min length is 3').max(10, 'name max length is 10').required('name is require'),
    email: yup.string().email('email is invalid').required('email is require'),
    password: yup.string().matches(passwordRegExp, 'Password must be at least 6 characters long').required('password is require'),
    rePassword: yup.string().oneOf([yup.ref('password')], "password and repassword dosen't match").required('repassword is require'),
    phone: yup.string().matches(phoneRegExp, 'phone is invalid').required('phone isrequire'),
  })
  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema,
    onSubmit
  })
  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>register </title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <div className=" w-75 mx-auto py-4">
      {error !== null ? <div className=" alert alert-danger">{error}</div> : ''}
      {success !== null ? <div className=" alert alert-success">{success}</div> : ''}
      <form onSubmit={formik.handleSubmit} className=' w-75 mx-auto py-2'>
        <label className=" mb-2">Name : </label>
        <input
          className='form-control mb-3'
          type="text"
          name='name'
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.name && formik.touched.name ? <div className='alert alert-danger mt-2 p-2'>{formik.errors.name}</div> : ''}
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


        <label className=" mb-2">Repassword : </label>
        <input
          className='form-control mb-3'
          type="password"
          name='rePassword'
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger mt-2 p-2'>{formik.errors.rePassword}</div> : ''}


        <label className=" mb-2">Phone : </label>
        <input
          className='form-control'
          type="tel"
          name='phone'
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger mt-2 p-2'>{formik.errors.phone}</div> : ''}

        {loading ?
          <button className='btn bg-main text-white mt-4' disabled='false'>
            <i className=' fa fa-spin fa-spinner'></i>

          </button> :
          <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white mt-4' type='submit' >Regester</button>
        }

      </form>

    </div>
  </>
}
