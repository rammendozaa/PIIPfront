import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import FormLogin from './FormLogIn'
import './FormLoginContainer.css'

export const FormLoginContainer = ({ validUserData, setUserData }) => {
  const [close, setClose] = useState(false)
  if (close === true) {
    return (
            <Navigate to="/"/>
    )
  }
  return (
        <>
            <div className='form-container'>
                <span className='close-btn' onClick={() => setClose(true)}>x</span>
                <div className='form-content-left'>
                    <img src='images/home.png' alt='happy' className='form-img'/>
                </div>
                <FormLogin validUserData={validUserData} setUserData={setUserData}/>
            </div>
        </>
  )
}

export default FormLoginContainer
