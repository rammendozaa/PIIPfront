import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'
import { useSelector } from 'react-redux'
import './SoftSkillQuestion.css'
const baseURL = 'http://127.0.0.1:5000'
import RequestError from '../../../RequestError'

function SoftSkillQuestion ({ userData }) {
  const { activity } = useSelector(state => state.userActivity)
  const activity_progress = (activity !== undefined && activity !== null) ? activity.activity_progress : null
  const navigate = useNavigate()
  const userId = userData.user_id
  const { question_id } = useParams()
  const [question, setQuestion] = useState('Is this a question?')
  const [answer, setAnswer] = useState((activity_progress !== undefined && activity_progress !== null) ? activity_progress.answer : '')
  const [errorCode, setErrorCode] = useState(null)

  const updateUserTemplateActivity = async (user_activity_id, status_id) => {
    const response = await fetch(
      baseURL + `/user/activity/${user_activity_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userData.token,
          'User-Type': userData.role,
          'User-Id': userData.user_id,
        },
        body: JSON.stringify({
          statusId: status_id
        })
      })
    if (response.status !== 200) {
      setErrorCode(response.status)
      return
    }
  }

  const saveQuestionProgress = async (status_id) => {
    const response = await fetch(
      baseURL + `/user/${userId}/soft-skill-question/${question_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userData.token,
          'User-Type': userData.role,
          'User-Id': userData.user_id,
        },
        body: JSON.stringify({
          statusId: status_id,
          answer
        })
      })
    if (response.status !== 200) {
      setErrorCode(response.status)
      return
    }
    alert('Question progress saved succesfully.')
  }
  const handleQuestionUpdate = async (status_id) => {
    if (userData.role === 'user') {
      saveQuestionProgress(status_id)
      if ((activity !== undefined && activity !== null) && activity.user_activity_id) {
        if (activity.user_activity_status_id !== 4) {
          updateUserTemplateActivity(activity.user_activity_id, status_id)
        }
      }
      navigate('/my-course')
    }
  }

  useEffect(() => {
    if ((activity !== undefined && activity !== null) && activity.question) {
      setQuestion(activity.question)
      setAnswer(activity_progress.answer)
    } else {
      fetch(`/soft-skill-question?questionId=${question_id}`, {
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
        setQuestion(data.question)
      })
      .catch(error_status => {
        setErrorCode(error_status)
        return
      })
    }
  }, [])
  if (errorCode !== null) {
    return <RequestError errorCode={errorCode}/>
  }

  return (
        <>
            <div className='ss-question-container'>
                <div className='ss-question'>
                {(userData.role !== 'user') &&
                    <div><h2 className="ss-question-title">This is the question</h2>
                    <hr className="hr-style"/>
                    <h1>{question}</h1></div>
                }
                {(userData.role === 'user') &&
                <>
                    <div className="ss-question-title">
                        <h2>Please respond to the following statement to the best of your abilities.</h2>
                        <h3><p>Remember that you can save and come back later.</p></h3></div>
                    <hr className="hr-style"/>
                    <h1>{question}</h1>
                    <br/><br/>
                    <textarea
                        className='text-area-ss-question'
                        id="input"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}>
                    </textarea>
                </>}
                </div>
                {(userData.role === 'user') &&
                <>
                              <div className="d-flex-ss-question justify-content-center-ss-question">

                    <button className="btn-ss-question btn-light-ss-question" onClick={() => handleQuestionUpdate(2)}>Save progress</button>
                    {((activity !== undefined && activity !== null) && activity.user_activity_status_id !== 4) && <button className="btn-ss-question btn-primary-ss-question" onClick={() => handleQuestionUpdate(4)}>I'm done!</button>}
                    <button className="btn-ss-question btn-light-ss-question" onClick={() => navigate('/my-course')}>Go back to my course</button>
                    </div>
                </>}

            </div>
        </>
  )
}

export default SoftSkillQuestion
