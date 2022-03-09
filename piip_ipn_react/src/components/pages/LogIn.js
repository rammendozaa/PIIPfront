import React from 'react'
import { FormLoginContainer } from '../FormLoginContainer'
import './LogIn.css'
import { Navigate } from 'react-router-dom';

function LogIn({validToken, setToken, setRole}) {
    if(validToken()){
        return(
           <Navigate to="/my-course"/>
        )
    }
    return (
        <>
            <div className='login-container'>
                <FormLoginContainer validToken={validToken} setToken={setToken} setRole={setRole}/>
            </div>
        </>
    )
}

export default LogIn