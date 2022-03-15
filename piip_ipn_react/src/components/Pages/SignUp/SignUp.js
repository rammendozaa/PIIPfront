import React from 'react'
import { FormSignupContainer } from './FormSignupContainer'
import './SignUp.css'
import { Navigate } from 'react-router-dom';

function SignUp({validUserData, setUserData}) {
    if(validUserData()){
        return(
           <Navigate to="/my-course"/>
        )
    }
    return (
        <>
            <div className='signup-container'>
                <FormSignupContainer validUserData={validUserData} setUserData={setUserData}/>
            </div>
        </>
    )
}

export default SignUp