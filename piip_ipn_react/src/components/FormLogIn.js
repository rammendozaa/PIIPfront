import React from 'react';
import useForm from './useForm';
import validate from './validateInfo'
import './Form.css'

const FormLogin = ({ submitForm, setToken }) => {
    const { handleChange, values, handleSubmit, errors } = useForm(submitForm, validate)

    const handleClick = () => {
        console.log("Aqui")
        fetch('/token', {
            method: "POST",
            body: JSON.stringify({
                email: "hugo",
                password: "hugo",
            }),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.access_token);
            setToken(data.access_token)
        });
    }

    /*return (
        <div className='form-content-right'>
            <form className='form' onSubmit={handleClick} noValidate>
                <h1>Get Started with us today</h1>
                <div className='form-inputs'>
                    <label htmlFor='email' className='form-label'>                        
                        Email
                    </label>
                    <input id='email' type='email' name='email' className='form-input' placeholder='Enter your email' value = {values.email} onChange={handleChange}/>
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div className='form-inputs'>
                    <label htmlFor='password' className='form-label'>                        
                        Password
                    </label>
                    <input id='password' type='password' name='password' className='form-input' placeholder='Enter your password' value = {values.password} onChange={handleChange}/>
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <button className='form-input-btn' type='submit'>Log In</button>
                <span className='form-input-login'>
                    Don't have an account? Sign up <a href='/'>here</a>
                </span>
            </form>
        </div>
    );*/
    return (
        <button onClick={handleClick()}>Aqui</button>
    );
};

export default FormLogin;
