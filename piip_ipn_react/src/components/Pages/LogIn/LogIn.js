import React from 'react'
import { FormLoginContainer } from './FormLoginContainer'
import './LogIn.css'
import { Navigate } from 'react-router-dom'

function LogIn ({ validUserData, setUserData }) {
  if (validUserData()) {
    return (
           <Navigate to="/my-course"/>
    )
  }
  return (
        <>
            <div className='login-container'>
                <FormLoginContainer validUserData={validUserData} setUserData={setUserData}/>
            </div>
        </>
  )
}

export default LogIn
