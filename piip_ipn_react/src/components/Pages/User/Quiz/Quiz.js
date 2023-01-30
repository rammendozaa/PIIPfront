import { IconContext } from 'react-icons'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import './Quiz.css'
import { useEffect } from 'react/cjs/react.development'
import { useSelector } from 'react-redux'
import RequestError from '../../../RequestError'

const baseURL = 'http://127.0.0.1:1234'

function Quiz ({ userData }) {
  const navigate = useNavigate()
  const { activity } = useSelector(state => state.userActivity)
  const { quiz_id } = useParams()
  const userId = userData.user_id
  const [questions, setQuestions] = useState([
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
  )
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0)
  const [errorCode, setErrorCode] = useState(null)

  useEffect(() => {
    if ((activity !== undefined && activity !== null) && activity.questions) {
      setQuestions(activity.questions)
    } else {
      fetch(`/questionnaire?questionnaireId=${quiz_id}`, {
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
        setQuestions(data.questions)
      })
      .catch(error_status => {
        setErrorCode(error_status)
        return
      })
    }
  }, [])

  const moveNext = (add) => {
    if (currentQuestion + add < 0) {
      setCurrentQuestion(0)
    } else if (currentQuestion + add < questions.length) {
      setCurrentQuestion(currentQuestion + add)
    }
  }

  const submitScore = async (actual_score) => {
    if (userData.role === 'user' && (activity.user_activity_status_id !== undefined && activity.user_activity_status_id !== 4)) {
      const response = await fetch(
        baseURL + `/user/${userId}/questionnaire/${quiz_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userData.token,
            'User-Type': userData.role,
            'User-Id': userData.user_id,
          },
          mode: 'cors',
          body: JSON.stringify({
            correctAnswers: actual_score
          })
        })
      if (response.status !== 200) {
        setErrorCode(response.status)
        return
      }
      if ((activity !== undefined && activity !== null) && activity.user_activity_id) {
        const response = await fetch(
          baseURL + `/user/activity/${activity.user_activity_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + userData.token,
              'User-Type': userData.role,
              'User-Id': userData.user_id,
            },
            body: JSON.stringify({
              statusId: 4
            })
          })
        if (response.status !== 200) {
          setErrorCode(response.status)
          return
        }
      }
    }
  }
  const handleAnswerOptionClick = (isCorrect) => {
    if (userData.role === 'user') {
      if (isCorrect) {
        setScore(score + 1)
      }
      if (currentQuestion + 1 === questions.length) {
        if (isCorrect) {
          submitScore(score + 1)
        } else {
          submitScore(score)
        }
        setShowScore(true)
      }
      const nextQuestion = currentQuestion + 1
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion)
      }
    }
  }
  if (errorCode !== null) {
    return <RequestError errorCode={errorCode}/>
  }

  return (
        <div className='quiz-container'>
			<div className="quiz-quiz">
				{userData.role === 'user' &&
				<h2>Solve ths quiz to the best of your abilities.<p>Remember that once you choose an option you can't go back to the previous question!</p></h2>}
				{userData.role !== 'user' &&
				<h2>These are the questions for this quiz:</h2>}
            <div className='quiz'>
                {showScore
                  ? (
                    <div className='score-section'>
						{userData.role === 'user' && activity.user_activity_status_id === 4 &&
						<>
							Your score of {score} out of {questions.length} will not be recorded as you have already solved this quiz ):
							<button className="btn-quiz btn-primary-quiz" onClick={() => { navigate('/my-course') }}>Click here to go back to your course!</button>
						</>
						}
						{userData.role === 'user' && activity.user_activity_status_id !== 4 &&
                        <>
							You answered {score} questions correctly out of {questions.length}!
							<button className="btn-quiz btn-primary-quiz" onClick={() => { navigate('/my-course') }}>Click here to go back to your course!</button>
						</>
						}
                    </div>
                    )
                  : (
                    <>
                        <div className='question-section'>
                            <div className='question-count'>
                                <span>Question {currentQuestion + 1}</span>/{questions.length}
                            </div>
                            <div className='question-text'>{questions[currentQuestion].questionText}</div>
                        </div>
                        <div className='answer-section'>
                            {questions[currentQuestion].answerOptions.map((answerOption) => (
                                <button className='answer-section-button' onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                            ))}
                        </div>
                    </>
                    )}
		    </div>
            {userData.role !== 'user' &&
			<div className='create-options'>
                <IconContext.Provider value={{ color: '#7690da', size: '25px' }}>
                    <span><BsFillArrowLeftCircleFill onClick={() => moveNext(-1)}/></span>
                    <span><BsFillArrowRightCircleFill onClick={() => moveNext(1)}/></span>
                </IconContext.Provider>
            </div>}
			</div>
		</div>
  )
}

export default Quiz
