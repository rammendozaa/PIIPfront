import React from 'react'
import { Form } from '../Form'
import './Login.css'
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
                <Form validToken={validToken} setToken={setToken} setRole={setRole}/>
            </div>
        </>
    )
}

export default LogIn