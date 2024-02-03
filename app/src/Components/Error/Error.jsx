import React from 'react';
import style from './Error.module.css';
import error from '../../Assets/images/error.svg'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Error() {

  function reloadPage() {
    window.location.reload();
}
  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Error</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    <div className=' d-flex w-100 vh-100 justify-content-around align-items-center'>
      <div>
        <h1>Ooops !</h1>
        <p className=' h3'>It Seem Something Went Wrong.</p>
        <br />
        <p className=' h5'> Click <Link  className='text-info a' to='/'>here</Link> to go to home Page or <span onClick={reloadPage}  className='text-info a cursor-pointer'>reloud</span> the page </p>
      </div>
      <img src={error} alt="Error" className=' w-50' />
    </div>
  </>
}
