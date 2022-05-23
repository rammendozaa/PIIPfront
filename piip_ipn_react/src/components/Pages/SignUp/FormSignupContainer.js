import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import FormSignUp from './FormSignUp'
import './FormSignupContainer.css';

export const FormSignupContainer = ({validUserData, setUserData}) => {
    const [close, setClose] = useState(false)
    if(close === true){
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
                <FormSignUp validUserData={validUserData} setUserData={setUserData}/>
            </div>
        </>
    );
};

export default FormSignupContainer;
