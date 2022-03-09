import React, { useState } from 'react';
import FormSuccess from './FormSuccess';
import FormSignUp from './FormSignUp'
import './FormLoginContainer.css';

export const FormSignupContainer = ({validToken, setToken, setRole}) => {
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
                {!isSubmitted ? (<FormSignUp submitForm={submitForm} setToken={setToken} validToken={validToken} setRole={setRole} />) : (<FormSuccess />)}
            </div>
        </>
    );
};

export default FormSignupContainer;
