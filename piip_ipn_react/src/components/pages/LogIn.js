import React from 'react'
import { Form } from '../Form'
import './Login.css'

function LogIn({setToken}) {
    return (
        <>
            <div className='login-container'>
                <Form setToken={setToken}/>
            </div>
        </>
    )
}

export default LogIn