import React from 'react'
import { FormSignupContainer } from './FormSignupContainer'
import './SignUp.css'
import { Navigate } from 'react-router-dom';

function SignUp({validToken, setToken, setRole}) {
    if(validToken()){
        return(
           <Navigate to="/my-course"/>
        )
    }
    return (
        <>
            <div className='signup-container'>
                <FormSignupContainer validToken={validToken} setToken={setToken} setRole={setRole}/>
            </div>
        </>
    )
}

export default SignUp