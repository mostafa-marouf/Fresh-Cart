import React from 'react';
import style from './ProtectedRoute.module.css';
import Register from '../Register/Register';

export default function ProtectedRoute(props) {

  if (localStorage.getItem('userToken')!==null) {
    return props.children
  }
  else{
    return <Register />
  }
}
