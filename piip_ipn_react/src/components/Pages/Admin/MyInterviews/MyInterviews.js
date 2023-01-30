import { useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { ActivityInfo } from '../../../../externalClasses'
import { setUserActivityInfo } from '../../../../state/reducers/activity'
import { useNavigate } from 'react-router-dom'
import './MyInterviews.css'
import { FiCheck, FiX } from 'react-icons/fi'
import { IconContext } from 'react-icons'
import RequestError from '../../../RequestError'

const baseURL = 'http://127.0.0.1:1234'

function MyInterviews ({ userData }) {
  const [interviews, setInterviews] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [errorCode, setErrorCode] = useState(null)

  useEffect(() => {
    fetch(`/interview?admin_id=${userData.user_id}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + userData.token,
        'User-Type': userData.role,
        'User-Id': userData.user_id,
      }
    })
    .then(async res => {
      if (res.status !== 200) {
        const error_status = res.status
        return Promise.reject(error_status);
      }  
      return res.json()
    })
    .then(data => {
      setInterviews(data)
    })
    .catch(error_status => {
      setErrorCode(error_status)
      return
    })
  }, [])

  const handleClick = (interview) => {
    const activityInfo = ActivityInfo(
      interview.id,
      1,
      interview,
      interview,
      interview
    )
    dispatch(setUserActivityInfo(activityInfo))
    navigate(`/mock-interviews/${interview.id}`)
  }
  if (errorCode !== null) {
    return <RequestError errorCode={errorCode}/>
  }

  return (
        <>
            <div className='my-interviews-container'>
                <div className="my-interviews">
                    {interviews.length > 0 && (<>
                        <h1 className='interview-title'>Here are your pending interviews. Click to view the details:</h1>
                            {interviews.map((interview, indexInterview) => {
                              return (
                                    <>
                                    <div className='Container' onClick={() => handleClick(interview)}>
                                        <span>
                                            <h1>{interview.user.first_name}</h1>
                                        </span>
                                        <span>
                                            {interview.chosenDate && <h2>You have an interview on {interview.chosenDate}</h2>}
                                            {!interview.chosenDate && <h2>No interview date chosen. Click to add one</h2>}
                                        </span>
                                        <span>
                                            <h2>Confirmed?</h2>
                                                <IconContext.Provider
                                                value={{ color: 'red', size: '25px' }}
                                                >
                                            {interview.isConfirmed &&
                                                    <FiCheck/>
                                            }
                                            {!interview.isConfirmed &&
                                                    <FiX/>
                                            }
                                                </IconContext.Provider>
                                        </span>
                                    </div>
                                    </>
                              )
                            })}
                        </>)
                    }
                    {interviews.length == 0 &&
                        <h1 className='interview-title'>You don't have any pending interviews!</h1>
                    }
                </div>
            </div>
        </>
  )
}

export default MyInterviews
