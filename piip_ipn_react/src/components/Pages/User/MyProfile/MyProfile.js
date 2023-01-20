import { useState, useEffect } from 'react'
import Metrics from './Metrics'
import './MyProfile.css'
import Settings from './Settings'
import RequestError from '../../../RequestError'

function MyProfile ({ userData }) {
  const [option, setOption] = useState('settings')
  const [user, setUser] = useState(null)
  const [errorCode, setErrorCode] = useState(null)

  const getUserData = async () => {
    const response = await fetch('/user', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + userData.token,
        'User-Type': userData.role,
        'User-Id': userData.user_id,
      }
    })
    if (response.status !== 200) {
      setErrorCode(response.status)
      return
    }
    const data = await response.json()
    setUser(data)
  }
  useEffect(() => {
    getUserData()
  }, [])
  if (errorCode !== null) {
    return <RequestError errorCode={errorCode}/>
  }

  return (
    user &&
        <div className="my-profile-container">
            <div className='profile-left'>
                <div className='user-profile'>
                    <figure className='user-photo'>
                        <img src="/images/profile.jpg" alt='travel' className='profile-img'/>
                    </figure>
                    <div className='user-info'>
                        <h1>{user.first_name + ' ' + user.last_name}</h1>
                        <p>{user.email}</p>
                    </div>
                </div>
            </div>
            <div className='profile-right'>
                <nav className='profile-navbar'>
                    <div className='profile-navbar-container'>
                        <ul className="profile-nav-menu">
                            <li className='profile-nav-item' onClick={() => setOption('settings')}>
                                Settings
                            </li>
                            <li className='profile-nav-item'>
                                |
                            </li>
                            <li className='profile-nav-item' onClick={() => setOption('statistics')}>
                                Statistics
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className='profile-content'>
                    {
                        option === 'settings' ? <Settings user={user}/> : <Metrics userData={userData}/>
                    }
                </div>
            </div>
        </div>
  )
}

export default MyProfile
