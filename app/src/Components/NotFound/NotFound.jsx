import React from 'react';
import style from './NotFound.module.css';
import error from '../../Assets/images/error.svg'
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

export default function NotFound() {
  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Not Found</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <div className=' d-flex w-100 vh-100 justify-content-around align-items-center'>
      <div>
        <h1>Ooops !</h1>
        <p className=' h3'>This Page Not Found.</p>
        <br />
        <p className=' h5'> Click <Link className='text-info a' to='/'>here</Link> to go to home Page. </p>
      </div>
      <img src={error} alt="Error" className=' w-50' />
    </div>
  </>
}
