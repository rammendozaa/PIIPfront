import React from 'react';
import useLoginForm from './useLoginForm';
import validate from './validateLoginInfo'
import {Link} from 'react-router-dom'

const FormLogin = ({ validUserData, setUserData}) => {
    const { handleChange, values, handleSubmit, errors } = useLoginForm(validate, validUserData, setUserData)

    return (
        <div className='form-content-right'>
            <form className='form' onSubmit={handleSubmit} noValidate>
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
                    Don't have an account? Sign up {<Link to='/sign-up'>here</Link>}
                </span>
            </form>
        </div>
    );
};

export default FormLogin;
