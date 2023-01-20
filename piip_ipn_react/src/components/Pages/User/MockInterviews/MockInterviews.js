import React, { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import DateTimePicker from 'react-datetime-picker'
import { useSelector } from 'react-redux'
import './MockInterviews.css'
import { IconContext } from 'react-icons'
import { BiArrowBack } from 'react-icons/bi'
const baseURL = 'http://127.0.0.1:5000'
import RequestError from '../../../RequestError'

function MockInterviews ({ userData }) {
  const [goBack, setGoBack] = useState(false)
  const [goBackAdmin, setGoBackAdmin] = useState(false)
  const { activity } = useSelector(state => state.userActivity)
  const [interviewInfo, setInterviewInfo] = useState({
    isActive: true,
    interviewCode: null,
    userId: 1,
    interviewUrl: null,
    chosenDate: null,
    administratorId: 1,
    feedback: null,
    languageId: null,
    isConfirmed: true,
    comment: 'that sounds good! ',
    interview_type_id: 2,
    id: 2,
    user: {
      school_id: '11',
      last_name: 'Mendoza Ramirez',
      first_name: 'Alvaro',
      email: 'amendozar1300@alumno.ipn.mx',
      id: '1'
    }
  })
  const [errorCode, setErrorCode] = useState(null)
  const { interview_id } = useParams()
  useEffect(() => {
    if ((activity !== undefined && activity !== null)) {
      setInterviewInfo(activity.activity)
    } else {
      fetch(`/interview?interview_id=${interview_id}`, {
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
        setInterviewInfo(data)
      })
      .catch(error_status => {
        setErrorCode(error_status)
        return
      })
    }
  }, [])
  const saveInterviewChanges = async ({
    chosen_date,
    chosen_comment,
    interview_url,
    interview_code,
    new_feedback,
    is_confirmed
  }) => {
    const chosenDate = chosen_date
    const comment = chosen_comment
    const interviewURL = interview_url
    const interviewCode = interview_code
    const feedback = new_feedback
    const isConfirmed = is_confirmed

    const response = await fetch(
      baseURL + `/interview?interview_id=${interviewInfo.id}&user_id=${interviewInfo.userId}&role=${userData.role}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userData.token,
            'User-Type': userData.role,
            'User-Id': userData.user_id,
        },
        body: JSON.stringify({
          chosenDate,
          comment,
          interviewUrl: interviewURL,
          interviewCode,
          feedback,
          isConfirmed
        })
      })
      if (response.status !== 200) {
        setErrorCode(response.status)
        return
      }
  }

  function AdminInterview ({ interviewInfo }) {
    const chosenDate = interviewInfo.chosenDate
    const isConfirmed = interviewInfo.isConfirmed
    const feedback = interviewInfo.feedback
    const url = interviewInfo.interviewUrl
    const comm = interviewInfo.comment
    const code = interviewInfo.interviewCode
    const [isChecked, setChecked] = useState(Boolean(isConfirmed))
    const [chosenCalendarDate, setChosenDate] = useState((chosenDate) ? new Date(chosenDate) : new Date())
    const [comment, setComment] = useState('')
    const [interviewURL, setInterviewURL] = useState(url)
    const [interviewFeedback, setInterviewFeedback] = useState(feedback)
    const [interviewCode, setInterviewCode] = useState(code)
    const saveChanges = async () => {
      await saveInterviewChanges({
        chosen_date: chosenCalendarDate,
        chosen_comment: comment,
        is_confirmed: isChecked,
        interview_url: interviewURL,
        new_feedback: interviewFeedback,
        interview_code: interviewCode
      })
      alert('Interview information updated!')
      setComment('')
    }
    if (errorCode !== null) {
      return <RequestError errorCode={errorCode}/>
    }
    return (
            <>
                {isConfirmed &&
                    <div className='mock-interview-message'>
                    <h1 className='message-h1'>Date for interview: {chosenCalendarDate.toString()}</h1>
                    </div>
                }
                {!isConfirmed &&
                    <div className='mock-interview-message choose-interview'>
                        <h1 className='message-h1'>Choose a date for your interview:</h1>
                        <DateTimePicker onChange={setChosenDate} value={chosenCalendarDate}/>
                    </div>}
                {!url &&
                <>
                    <div className='mock-interview-message commentsPink'>
                        <h1 className='message-h1'>Add a link for your upcoming interview:</h1>
                        <textarea
                            className='ta'
                            id="comment"
                            value={interviewURL}
                            onChange={(e) => setInterviewURL(e.target.value)}>
                        </textarea>
                    </div>
                </>
                }
                {url &&
                <>
                <div className='mock-interview-message'>
                    <h1 className='message-h1'>Upcoming interview link: {url}</h1>
                </div>
                </>
                }
                {comm &&
                <div className='mock-interview-message'>
                    <h1 className='message-h1'>Last interaction:</h1>
                    <h2 className='message-h2'>{comm}</h2>
                </div>
                }
                {!feedback &&
                <>
                    <div className='mock-interview-message comments'>
                        <h1 className='message-h1'>Feedback:</h1>
                        <textarea
                            className='ta'
                            id="comment"
                            value={interviewFeedback}
                            onChange={(e) => setInterviewFeedback(e.target.value)}>
                        </textarea>
                    </div>
                </>
                }
                {feedback &&
                    <>
                    <div className='mock-interview-message'>
                        <h1 className='message-h1'>This is the feedback you submitted: <p>{url}</p></h1>
                    </div>
                    </>
                }
                {!code &&
                <>
                    <div className='mock-interview-message commentsBlue'>
                    <h1 className='message-h1'>Add the code written here:</h1>
                    <textarea
                        className='ta'
                        id="comment"
                        value={interviewCode}
                        onChange={(e) => setInterviewCode(e.target.value)}>
                    </textarea>
                    </div>
                </>
                }
                {!isConfirmed &&
                <div className='mock-interview-message commentsOther'>
                    <label>
                        <input
                            type="checkbox"
                            onChange={() => { setChecked(!isChecked) }}
                            />
                        <h2 className='message-h2'>
                        Confirm interview?
                        </h2>
                    </label>
                </div>
                }
                <div className='mock-interview-message commentsOrange'>
                    <h2 className='message-h2'>Comments or questions?</h2>
                    <textarea
                        className='ta'
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}>
                    </textarea>
                    <button className="btn10" onClick={() => saveChanges()}>Save interview info</button>
                </div>
                {/* <button onClick={() => saveChanges()}>Go back to my pending interviews</button> */}
            </>
    )
  }

  function UserInterview ({ interviewInfo }) {
    const isConfirmed = interviewInfo.isConfirmed
    const feedback = interviewInfo.feedback
    const comm = interviewInfo.comment
    const chosenDate = interviewInfo.chosenDate
    const url = interviewInfo.interviewUrl
    const [chosenCalendarDate, setChosenDate] = useState((chosenDate) ? new Date(chosenDate) : new Date())
    const [comment, setComment] = useState('')
    if (chosenCalendarDate === null) {
      setChosenDate(new Date())
    }
    const saveChanges = async () => {
      await saveInterviewChanges({
        chosen_date: chosenCalendarDate,
        chosen_comment: comment,
        is_confirmed: isConfirmed
      })
      alert('Interview information updated!')
      setComment('')
    }
    return (
            <>
                {isConfirmed && !feedback &&
                <div className='mock-interview-message'>
                    <h1 className='message-h1'>The interview will be held here: {interviewInfo.interview_url}</h1>
                    <h2 className='message-h2'>At this date: {chosenCalendarDate.toString()}</h2>
                </div>}
                {url &&
                <>
                <div className='mock-interview-message'>
                    <h1 className='message-h1'>Upcoming interview link: {url}</h1>
                </div>
                </>
                }
                {comm &&
                <div className='mock-interview-message'>
                        <h1 className='message-h1'>Last interaction:</h1>
                        <h2 className='message-h2'> {comm}</h2>
                        <a className="close">&times;</a>
                </div>
                }
                {!isConfirmed &&
                <div className='mock-interview-message choose-interview'>
                    <h1 className='message-h1'>Choose the interview day:</h1>
                    <DateTimePicker onChange={setChosenDate} value={chosenCalendarDate}/>
                </div>
                }
                {feedback &&
                    <div className='mock-interview-message'>
                        <h1>Feedback for you: <p>{feedback}</p></h1>
                    </div>
                }
                <div className='mock-interview-message comments'>
                    <h2 className='message-h2'>Comments or questions?</h2>
                    <textarea
                        className='ta'
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}>
                    </textarea>
                    <button className="btn10" onClick={() => saveChanges()}>Save interview info</button>
                </div>
            </>
    )
  }
  if (goBack === true) {
    const url = '/my-course'
    return (
            <Navigate to={url}/>
    )
  }
  if (goBackAdmin === true) {
    const url = '/my-interviews'
    return (
            <Navigate to={url}/>
    )
  }
  return (
        <>
            <div className='mock-interview-container'>
                <div className='mock-interview'>
                    {userData.role === 'user' &&
                        <>
                            <div className='mock-bar'>
                                <IconContext.Provider value={{ color: '#202731', size: '25px' }}>
                                    <BiArrowBack onClick={() => setGoBack(true)}/>
                                </IconContext.Provider>
                                <h1 className='view-details'>View the details of your upcoming interview</h1>
                            </div>
                            <div className='mi'>
                                <UserInterview interviewInfo={interviewInfo}/>
                            </div>
                        </>
                    }
                    {userData.role !== 'user' &&
                        <>
                            <div className='mock-bar'>
                                <IconContext.Provider value={{ color: '#202731', size: '25px' }}>
                                    <BiArrowBack onClick={() => setGoBackAdmin(true)}/>
                                </IconContext.Provider>
                                <h1 className='view-details'>Interview's details:</h1>
                            </div>
                            <div className='mi'>
                                <AdminInterview interviewInfo={interviewInfo}/>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
  )
}

export default MockInterviews
