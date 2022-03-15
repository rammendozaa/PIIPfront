import React, { useState } from 'react';
import FormSuccess from './FormSuccess';
import FormLogin from './FormLogIn'
import './FormLoginContainer.css';

export const FormLoginContainer = ({validUserData, setUserData}) => {
    return (
        <>
            <div className='form-container'>
                <span className='close-btn'>x</span>
                <div className='form-content-left'>
                    <img src='images/home.png' alt='happy' className='form-img'/>
                </div>
                <FormLogin validUserData={validUserData} setUserData={setUserData}/>
            </div>
        </>
    );
};

export default FormLoginContainer;
