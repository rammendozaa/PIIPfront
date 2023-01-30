import React, { useState, useEffect } from 'react'
import useSignupForm from './useSignupForm'
import validate from './validateSignupInfo'
import { Link } from 'react-router-dom'
import RequestError from '../../RequestError'

const FormSignUp = ({ validUserData, setUserData }) => {
  const { handleChange, values, handleSubmit, errors } = useSignupForm(validate, setUserData, validUserData)
  const [schools, setSchools] = useState([])
  const [errorCode, setErrorCode] = useState(null)

  useEffect(() => {
    fetch('/schools', {
      method: 'GET'
    })
    .then(async res => {
        if (res.status !== 200) {
          const error_status = res.status
          return Promise.reject(error_status);
        }  
        return res.json()
      })
    .then(data => {
        setSchools(data)
    })
    .catch(error_status => {
        setErrorCode(error_status)
        return
      })
  }, [])

  if (errorCode !== null) {
    return <RequestError errorCode={errorCode}/>
  }

  return (
        <div className='form-content-right'>
            <form className='form' onSubmit={handleSubmit} noValidate>
                <h1>Get Started with us today</h1>
                <div className='form-inputs'>
                    <label htmlFor='firstname' className='form-label'>
                        First Name
                    </label>
                    <input id='firstname' type='text' name='firstname' className='form-input' placeholder='Enter your first name' value = {values.firstname} onChange={handleChange}/>
                    {errors.firstname && <p>{errors.firstname}</p>}
                </div>
                <div className='form-inputs'>
                    <label htmlFor='lastname' className='form-label'>
                        Last Name
                    </label>
                    <input id='lastname' type='text' name='lastname' className='form-input' placeholder='Enter your last name' value = {values.lastname} onChange={handleChange}/>
                    {errors.lastname && <p>{errors.lastname}</p>}
                </div>
                <div className='form-inputs'>
                    <label htmlFor='email' className='form-label'>
                        Email
                    </label>
                    <input id='email' type='email' name='email' className='form-input' placeholder='Enter your email' value = {values.email} onChange={handleChange}/>
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div className='form-inputs'>
                    <label htmlFor='school' className='form-label'>
                        School
                    </label>
                    <select
                        id="school_id"
                        name = "school_id"
                        className='select-school'
                        onChange={handleChange}
                        value={values.school_id}
                    >
                        {
                            schools && schools.map(opt => <option value={opt.id} key={opt.id}>{opt.name}</option>)
                        }
                    </select>
                    {errors.school && <p>{errors.school}</p>}
                </div>
                <div className='form-inputs'>
                    <label htmlFor='password' className='form-label'>
                        Password
                    </label>
                    <input id='password' type='password' name='password' className='form-input' placeholder='Enter your password' value = {values.password} onChange={handleChange}/>
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <div className='form-inputs'>
                    <label htmlFor='password2' className='form-label'>
                        Confirm Password
                    </label>
                    <input id='password2' type='password' name='password2' className='form-input' placeholder='Confirm your password' value = {values.password2} onChange={handleChange}/>
                    {errors.password2 && <p>{errors.password2}</p>}
                </div>
                <button className='form-input-btn' type='submit'>Sign Up</button>
                <span className='form-input-login'>
                    Already have an account? Login {<Link to='/log-in'>here</Link>}
                </span>
            </form>
        </div>
  )
}

export default FormSignUp
