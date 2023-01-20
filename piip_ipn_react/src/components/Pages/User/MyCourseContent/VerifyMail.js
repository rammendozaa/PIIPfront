import { useNavigate, Navigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'

function VerifyMail ({ userData }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [confirmationMsg, setConfirmationMsg] = useState('')
  const navigate = useNavigate()

  const confirmEmail = async (token) => {
    const formData = new FormData()
    formData.append('token', token)
    const response = await fetch('/confirm', {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    setConfirmationMsg(data.msg)
  }
  const redirect = () => {
    const timer = setTimeout(() => navigate('/my-course'), 4000)
    return () => clearTimeout(timer)
  }

  if (confirmationMsg === 'confirmed') {
    return (
            <div className='mycourse-content-container'>
                <h1>You already confirmed your mail!</h1><p className='subtitle'>Don't waste your time, start studying for the intership of your dreams!</p>
                {redirect()}
            </div>
    )
  } else if (confirmationMsg === 'success') {
    return (
            <div className='mycourse-content-container'>
                <h1>Thanks for verifying your account!</h1><p className='subtitle'>Ready to start your journey?</p>
                {redirect()}
            </div>
    )
  }
  const token = searchParams.get('token')
  if (token !== undefined && token !== null) {
    confirmEmail(token)
  } else {
    return (
            <Navigate to="/my-course"/>
    )
  }
  return (
        <div className='mycourse-content-container'>
            <h1>Sorry, but your token has expired</h1><p className='subtitle'>Click here to create a new one</p>
            <img className='mycourse-sorryimg' src='/images/sorry-removebg-preview.png'></img>
        </div>
  )
}
export default VerifyMail
