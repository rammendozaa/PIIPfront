import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './StartingQuiz.css'
const baseURL = 'http://127.0.0.1:5000'

function StartingQuiz ({ userData, questionnaire, description, descriptionText, setDescriptionText }) {
  const userId = userData.user_id
  const questions = questionnaire.questions
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0)

  for (let i = 0; i < questions.length; i++) {
    questions[i].answerOptions.sort((a, b) => 0.5 - Math.random())
  }

  const submitScore = async (actual_score) => {
    if (description) {
      setDescriptionText(descriptionText)
    }
    const response = await fetch(
      baseURL + `/user/${userId}/questionnaire/${questionnaire.id}/assign`, {
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
    const response_json = await response.json()
    setTimeout(() => { window.location.reload() }, 2000)
  }
  const handleAnswerOptionClick = (isCorrect) => {
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

  return (
        <div className='starting-quiz-container'>
            <div className='starting-quiz'>
                {showScore
                  ? (
                    <div className='starting-score-section'>
                        You answered {score} questions correctly out of {questions.length}!
                    </div>
                    )
                  : (
                    <>
                        <div className='starting-quiz-question-section'>
                            <div className='starting-quiz-question-count'>
                                <span>Question {currentQuestion + 1}</span> out of {questions.length}
                            </div>
							<br/><br/><br/>
                            <div className='starting-quiz-question-text'>{questions[currentQuestion].questionText}</div>
                        </div>
                        <div className='starting-quiz-answer-section'>
                            {questions[currentQuestion].answerOptions.map((answerOption) => (
                                <button className='starting-quiz-answer-section-button' onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                            ))}
                        </div>
                    </>
                    )}
		    </div>
        </div>
  )
}

export default StartingQuiz
