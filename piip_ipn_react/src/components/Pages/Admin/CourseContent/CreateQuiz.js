import { useEffect, useState } from 'react'
import './CreateQuiz.css'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
import { FaSave } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import { FiPlus, FiMinus } from 'react-icons/fi'
import { TiDelete } from 'react-icons/ti'
const baseURL = 'http://127.0.0.1:5000'

function CreateQuiz ({ userData, addActivity, activityIndex, sectionId }) {
  const [addedQuiz, setAddedQuiz] = useState()
  const [questions, setQuestions] = useState([
    {
      questionText: 'Question',
      answerOptions: [
        { answerText: 'Option 1', isCorrect: true },
        { answerText: 'Option 2', isCorrect: false },
        { answerText: 'Option 3', isCorrect: false },
        { answerText: 'Option 4', isCorrect: false }
      ]
    }
  ])
  const [questionnaireName, setQuestionnaireName] = useState('')
  const [description, setDescription] = useState('')

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const changeCorrectAnswer = (idx) => {
    const current = [...questions]
    for (let i = 0; i < current[currentQuestion].answerOptions.length; i++) {
      current[currentQuestion].answerOptions[i].isCorrect = false
    }
    current[currentQuestion].answerOptions[idx].isCorrect = true
    setQuestions(current)
  }
  const handleChange = (e) => {
    const current = [...questions]
    current[currentQuestion].questionText = e.value
    setQuestions(current)
  }
  const handleOptionsChange = (e, idx) => {
    const current = [...questions]
    current[currentQuestion].answerOptions[idx].answerText = e.value
    setQuestions(current)
  }
  const addNewQuestion = () => {
    setQuestions([...questions,
      {
        questionText: 'Question',
        answerOptions: [
          { answerText: 'Option 1', isCorrect: true },
          { answerText: 'Option 2', isCorrect: false },
          { answerText: 'Option 3', isCorrect: false },
          { answerText: 'Option 4', isCorrect: false }
        ]
      }
    ])
    setCurrentQuestion(currentQuestion + 1)
  }

  const removeQuestion = () => {
    if (questions.length === 1) {
      alert("Can't have a questionnaire without questions. Right?")
      return
    }
    questions.splice(currentQuestion, 1)
    setQuestions(questions)
    setCurrentQuestion(Math.min(currentQuestion + 1, questions.length - 1))
  }

  const saveNewQuestionnaire = async () => {
    const response = await fetch('/questionnaire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: questionnaireName || 'Surprise quiz',
        description: description || 'Questionnaire to test your learnings',
        questions,
        createdBy: userData.user_id
      })
    })
    const newQuestionnaire = await response.json()
    alert('Questionnaire saved successfully!')
    setQuestionnaireName('')
    setDescription('')
    setCurrentQuestion(0)
    setQuestions([
      {
        questionText: 'Question',
        answerOptions: [
          { answerText: 'Option 1', isCorrect: true },
          { answerText: 'Option 2', isCorrect: false },
          { answerText: 'Option 3', isCorrect: false },
          { answerText: 'Option 4', isCorrect: false }
        ]
      }
    ])
  }

  const moveNext = (add) => {
    if (currentQuestion + add < 0) {
      setCurrentQuestion(0)
    } else if (currentQuestion + add < questions.length) {
      setCurrentQuestion(currentQuestion + add)
    }
  }
  return (
        <div className='create-quiz-container'>
            <div className="d-flex-create-quiz justify-content-center-create-quiz">
                <div className="input-create-quiz-header">Questionaire name:</div>
                <div className="input-create-quiz-header">Description:</div>
            </div>
            <div className="d-flex-create-quiz justify-content-center-create-quiz">
                <input type="text" placeholder="Questionnaire name" value={questionnaireName} onChange={(e) => setQuestionnaireName(e.target.value)} className="input-create-quiz"/>
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="input-create-quiz"/>
            </div>
            <div className='create-quiz'>
                <div className='create-question-section'>
                    <div className='create-question-count'>
                        <span>Question {currentQuestion + 1}</span>/{questions.length}
                        <IconContext.Provider value={{ color: 'var(--primary-color)', size: '25px' }}>
                            <span className='removeQuestion'><TiDelete onClick={() => removeQuestion()}/></span>
                        </IconContext.Provider>
                    </div>
                    <div className='question-text'>
                        <input className='question-text-input' value={questions[currentQuestion].questionText} onChange={(e) => handleChange(e.target)}/>
                    </div>
                </div>
                <div className='create-answer-section'>
                    {
                        questions[currentQuestion].answerOptions.map((answerOption, idx) => (
                            <button contentEditable="true" className={'create-answer-section-button ' + (answerOption.isCorrect == true ? 'create-correct' : 'create-incorrect')} onClick={() => changeCorrectAnswer(idx)}>
                                <input className='answer-input' value={answerOption.answerText} onChange={(e) => handleOptionsChange(e.target, idx)}/>
                            </button>
                        ))
                    }
                </div>
		    </div>
            <div className='create-options'>
                <IconContext.Provider value={{ color: 'var(--primary-color)', size: '25px' }}>
                    <span><BsFillArrowLeftCircleFill onClick={() => moveNext(-1)}/></span>
                    <span><FaSave onClick={() => saveNewQuestionnaire()}/></span>
                    <span><FiPlus onClick={() => addNewQuestion()}/></span>
                    <span><BsFillArrowRightCircleFill onClick={() => moveNext(1)}/></span>
                </IconContext.Provider>
            </div>
        </div>
  )
}

export default CreateQuiz
