import React, { useState } from 'react';
import FormLogin from './FormLogIn';
import FormSuccess from './FormSuccess';
import './Form.css';

export const Form = () => {
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
                {!isSubmitted ? (<FormLogin submitForm={submitForm} />) : (<FormSuccess />)}
            </div>
        </>
    );
};

export default Form;
