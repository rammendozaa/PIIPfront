import { FiCheck, FiSlash, FiEdit3, FiPlus, FiMinus } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import './MyCourseContent.css'
import { IconContext } from 'react-icons'
import StartingQuiz from '../StartingQuiz/StartingQuiz'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUserTemplate } from '../../../../state/reducers/template'
import { setUserActivityInfo } from '../../../../state/reducers/activity'
import { ActivityInfo } from '../../../../../src/externalClasses'
import RequestError from '../../../RequestError'

const baseURL = 'http://127.0.0.1:5000'
const activityIdToName = {
  1: 'Problem',
  2: 'Topic',
  3: 'Soft Skill Question',
  4: 'Topic',
  5: 'Interview',
  6: 'Questionnaire'
}

function CourseContent ({ userData }) {
  const dispatch = useDispatch()
  const user_id = userData.user_id
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [data, setData] = useState({ template: { name: 'Course Name' }, user_sections: [] })
  const [clicked, setClicked] = useState(-1)
  const [administratorId, setAdministratorId] = useState(-1)
  const [descriptionText, setDescriptionText] = useState("Please answer this quiz so that we know what's the perfect study plan for you!")
  const [baseQuestionnaire, setBaseQuestionnaire] = useState({
    title: 'first questionnaire',
    description: 'this is the first',
    questions: [
      {
        questionText: 'Question 1',
        answerOptions: [
          {
            answerText: 'this is not answer 1',
            isCorrect: false
          }, {
            answerText: 'this is answer',
            isCorrect: true
          }, {
            answerText: 'this is not answer 2',
            isCorrect: false
          }, {
            answerText: 'this is not answer 3',
            isCorrect: false
          }
        ]
      }
    ]
  })
  const [errorCode, setErrorCode] = useState(null)
  const resendEmail = async () => {
    const response = await fetch(`/sendVerificationEmail`, {
      method: 'POST',
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
    // TODO: add error handling
  }

  const getUserData = async () => {
    const response = await fetch('/user', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + userData.token,
        'User-Type': userData.role,
        'User-Id': userData.user_id,
      }
    })
    const data = await response.json()
    setUser(data)
  }
  useEffect(() => {
    fetch('/questionnaire?questionnaireId=999999', {
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
      setBaseQuestionnaire(data)
    })
    .catch(error_status => {
      setErrorCode(error_status)
      return
    })
    fetch('/get-admin', {
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
      setAdministratorId(data.administrator_id)
    })
    .catch(error_status => {
      setErrorCode(error_status)
      return
    })
    fetch(`/user/${user_id}/template`, {
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
      setData(data)
      dispatch(setUserTemplate(data))
    })
    .catch(error_status => {
      setErrorCode(error_status)
      return
    })
    getUserData()
  }, [user_id])

  const toggle = index => {
    if (clicked === index) {
      // if clicked question is already active, then close it
      return setClicked(-1)
    }
    setClicked(index)
  }

  const redirectToActivity = (activity) => {
    const activity_id = activity.template_activity.activity.id
    const activityInfo = ActivityInfo(
      activity.id,
      activity.status_id,
      activity.template_activity,
      activity.template_activity.activity,
      activity.activity_progress
    )
    const activityType = activity.template_activity.activityType
    dispatch(setUserActivityInfo(activityInfo))
    if (activityType == 1) {
      navigate(`/problem/${activity_id}`)
    } else if (activityType == 2) {
      navigate(`/topic/algorithm/${activity_id}`)
    } else if (activityType == 3) {
      navigate(`/soft-skill-question/${activity_id}`)
    } else if (activityType == 4) {
      navigate(`/topic/softskill/${activity_id}`)
    } else if (activityType == 5) {
      navigate(`/mock-interviews/${activity_id}`)
    } else if (activityType == 6) {
      navigate(`/solve-quiz/${activity_id}`)
    }
  }

  if (user && user.is_active === 2) {
    return (
            <div className='mycourse-content-container'>
                <h1>Please verify your email.</h1><p className='subtitle'>We've sent a confirmation link to {user.email} to verify your email address and activate your account. The link will expire in 1 hour</p>
                <img className='mycourse-sorryimg' src='/images/sorry-removebg-preview.png'></img>
                <br/>
                <p className="subtitle">Didn't receive email? <span style={{cursor:"pointer"}} onClick={ resendEmail }>Click here to resend it</span></p>
            </div>
    )
  }

  if (data.template === undefined) { // hasn't solved initial quiz
    return (
            <div className='mycourse-content-container'>
                <div className='mycourse-content-quiz'>
                    <h3 className='mycourse-description'>{descriptionText}</h3>
                    <StartingQuiz
                        userData={userData}
                        questionnaire={baseQuestionnaire}
                        description={true}
                        descriptionText={"Thanks! We'll get back to you soon!"}
                        setDescriptionText={setDescriptionText}
                    />
                </div>
            </div>
    )
  }

  if (administratorId === -1) {
    return (
            <div className='mycourse-content-container'>
                <h1>Sorry, you do not yet have a mentor assigned to you. <p>We're contacting them so don't worry!</p></h1>
                <img className='mycourse-sorryimg' src='/images/sorry-removebg-preview.png'></img>
            </div>
    )
  }
  if (errorCode !== null) {
    return <RequestError errorCode={errorCode}/>
  }

  return (
        <>
            <div className='mycourse-content-container'>
                <div className='mycourse'>
                    <h1 className='mycourse-title'> {data.template.name} </h1>
                    <IconContext.Provider value={{ color: 'var(--primary-color)', size: '25px' }}>
                        <div className='mycourse-accordionSection'>
                            <div className='mycourse-container'>
                                {data.user_sections.map((section, indexSection) => {
                                  return (
                                    <>
                                        <div className='mycourse-wrap' onClick={() => toggle(indexSection)} key={indexSection}>
                                            <h1>
                                            {section.status_id === 4 &&
                                            <span>
                                                <IconContext.Provider value={{ color: 'green', className: 'global-class-name' }}>
                                                    <FiCheck/>
                                                </IconContext.Provider>
                                            </span>}
                                            {section.status_id === 1 &&
                                            <span>
                                                <IconContext.Provider value={{ color: 'red', className: 'global-class-name' }}>
                                                    <FiSlash/>
                                                </IconContext.Provider>
                                            </span>}
                                            {section.status_id !== 1 && section.status_id !== 4 &&
                                            <span>
                                                <IconContext.Provider value={{ color: 'black', className: 'global-class-name' }}>
                                                    <FiEdit3/>
                                                </IconContext.Provider>
                                            </span>}
                                                {section.template_section.name}</h1>
                                            <span>{clicked === indexSection ? <FiMinus /> : <FiPlus />}</span>
                                        </div>
                                        <div className='mycourse-activities-container'>
                                        {
                                            clicked === indexSection
                                              ? (
                                                  section.user_activities.map((activity, indexActivity) => {
                                                    return (
                                                            <>
                                                                <div className='mycourse-dropdown' onClick={() => redirectToActivity(
                                                                  activity)} key={indexActivity}>
                                                                    <p><b>
                                                                        {activity.status_id === 4 && <span className='mycourse-activity-status'>
                                                                            <IconContext.Provider value={{ color: 'green', className: 'global-class-name' }}>
                                                                                <FiCheck/>
                                                                            </IconContext.Provider>
                                                                        </span>}
                                                                        {activity.status_id === 1 && <span className='mycourse-activity-status'>
                                                                            <IconContext.Provider value={{ color: 'red', className: 'global-class-name' }}>
                                                                                <FiSlash/>
                                                                            </IconContext.Provider>
                                                                        </span>}
                                                                        {activity.status_id !== 1 && activity.status_id !== 4 && <span className='mycourse-activity-status'>
                                                                            <IconContext.Provider value={{ color: 'black', className: 'global-class-name' }}>
                                                                                <FiEdit3/>
                                                                            </IconContext.Provider>
                                                                        </span>}
                                                                        {activityIdToName[activity.template_activity.activityType]}</b>: {activity.template_activity.name}</p>
                                                                </div>
                                                            </>
                                                    )
                                                  })
                                                )
                                              : null
                                        }
                                        </div>
                                    </>
                                  )
                                })}
                            </div>
                        </div>
                    </IconContext.Provider>
                </div>
            </div>
        </>
  )
}

export default CourseContent
