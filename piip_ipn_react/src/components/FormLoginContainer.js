import React, { useState } from 'react';
import FormSuccess from './FormSuccess';
import FormLogin from './FormLogIn'
import './FormLoginContainer.css';

export const FormLoginContainer = ({validToken, setToken, setRole}) => {
    const [isSubmitted, setIsSubmitted] = useState(false)

    function submitForm() {
        setIsSubmitted(true);
    }
    return (
        <>
            <div className='form-container'>
                <span className='close-btn'>x</span>
                <div className='form-content-left'>
                    <img src='images/home.png' alt='happy' className='form-img'/>
                </div>
                {!isSubmitted ? (<FormLogin submitForm={submitForm} setToken={setToken} validToken={validToken} setRole={setRole} />) : (<FormSuccess />)}
            </div>
        </>
    );
};

export default FormLoginContainer;
