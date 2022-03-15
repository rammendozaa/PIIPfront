import React, { useState } from 'react';
import FormSuccess from './FormSuccess';
import FormSignUp from './FormSignUp'
import './FormSignupContainer.css';

export const FormSignupContainer = ({validUserData, setUserData}) => {
    return (
        <>
            <div className='form-container'>
                <span className='close-btn'>x</span>
                <div className='form-content-left'>
                    <img src='images/home.png' alt='happy' className='form-img'/>
                </div>
                <FormSignUp validUserData={validUserData} setUserData={setUserData}/>
            </div>
        </>
    );
};

export default FormSignupContainer;
