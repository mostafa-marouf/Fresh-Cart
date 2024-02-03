import React, { useContext, useEffect } from 'react';
import style from './LayOut.module.css';
import NavBar from '../NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import { userContext } from './../../Context/userContext';

export default function LayOut() {
  let { setUserToken } = useContext(userContext);


  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      setUserToken(localStorage.getItem('userToken'))
    }
  }, [])
  return <>
    <NavBar />
    <div className=" container m-auto">
      <Outlet></Outlet>
    </div>
  </>
}
