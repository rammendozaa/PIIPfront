import React, { useState } from 'react';
import FormSuccess from './FormSuccess';
import FormSignUp from './FormSignUp'
import './FormSignupContainer.css';

export const FormSignupContainer = ({validUserData, setUserData}) => {
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
                {!isSubmitted ? (<FormSignUp submitForm={submitForm} validUserData={validUserData} setUserData={setUserData} />) : (<FormSuccess />)}
            </div>
        </>
    );
};

export default FormSignupContainer;
