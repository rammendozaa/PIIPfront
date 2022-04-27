import {useEffect, useState} from 'react'
import './CreateQuiz.css'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import {FaSave} from 'react-icons/fa'
import { IconContext } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { TiDelete } from 'react-icons/ti'
import { NewActivity } from './CourseContent';
const baseURL = "http://127.0.0.1:5000"


function CreateQuiz({userData, addActivity, activityIndex, sectionId}) {
    const [addedQuiz, setAddedQuiz] = useState()
    const [quizzes, setQuizzes] = useState([])

    const fetchQuestionnaires = async () => {
        fetch(baseURL + `/questionnaire`,{
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setQuizzes(data)
        })
    }
    useEffect(() => {
        fetchQuestionnaires()
    }, []);


    const [questions, setQuestions] = useState([
        {
            questionText: 'Question',
			answerOptions: [
				{ answerText: 'Option 1', isCorrect: true },
				{ answerText: 'Option 2', isCorrect: false },
				{ answerText: 'Option 3', isCorrect: false },
				{ answerText: 'Option 4', isCorrect: false },
			],
        }
    ])

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const changeCorrectAnswer = (idx) => {
        var current = [...questions];
        for(var i = 0; i < current[currentQuestion].answerOptions.length; i++){
            current[currentQuestion].answerOptions[i].isCorrect = false
        }
        current[currentQuestion].answerOptions[idx].isCorrect = true
        setQuestions(current)
    }
    const handleChange = (e) => {
        var current = [...questions];
        current[currentQuestion].questionText = e.value
        setQuestions(current)
    }
    const handleOptionsChange = (e,idx) => {        
        var current = [...questions];
        current[currentQuestion].answerOptions[idx].answerText = e.value
        setQuestions(current)
    }
    const addNewQuestion = () => {
        setQuestions([...questions,
            {
                questionText: 'Question ',
                answerOptions: [
                    { answerText: 'Option 1', isCorrect: true },
                    { answerText: 'Option 2', isCorrect: false },
                    { answerText: 'Option 3', isCorrect: false },
                    { answerText: 'Option 4', isCorrect: false },
                ],
            }
        ])
        setCurrentQuestion(currentQuestion+1);
    }

    const addQuestionnaire = (quiz, index) => {
        const newAct = NewActivity(quiz.title, quiz.description, 6, quiz.id);
        addActivity(newAct, activityIndex, sectionId);
    }

    const removeQuestion = () => {
        questions.splice(currentQuestion, 1);
        setQuestions(questions)
        setCurrentQuestion(Math.min(currentQuestion + 1, questions.length - 1))
    }

    const saveNewQuestionnaire = async () => {
        const response = await fetch(baseURL + `/questionnaire`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "title": "test questionnaire",
                "description": "teast descript",
                "questions": questions
            }),
        })
        const newQuestionnaire = await response.json()
        fetchQuestionnaires()
        console.log(newQuestionnaire)
    }
    
    const moveNext = (add) => {
        if(currentQuestion+add < 0){
            setCurrentQuestion(0);
            console.log(0)
        }else if(currentQuestion+add < questions.length){
            setCurrentQuestion(currentQuestion+add)
        }
    }
    return (
        <div className='create-quiz-container'>
            <div className='div-table'>
            <table className='content-table'>
                <thead>
                    <tr>
                    <th>Available questionnaires</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        quizzes.map((quiz, index) => 
                            <tr>
                                <td className='tdd'>
                                {quiz['title']}
                                <IconContext.Provider value={{ color: "#009879", size: '25px' }}>
                                    {
                                    <FiPlus onClick={() => addQuestionnaire(quiz, index)}/>
                                    }
                                </IconContext.Provider>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            </div>
            <div className='create-quiz'>
                <div className='create-question-section'>
                    <div className='create-question-count'>
                        <span>Question {currentQuestion + 1}</span>/{questions.length}
                        <span><TiDelete onClick={() => removeQuestion()}/></span>
                    </div>
                    <div className='question-text'>
                        <input className='question-text-input' value={questions[currentQuestion].questionText} onChange={(e) => handleChange(e.target)}/>
                    </div>
                </div>
                <div className='create-answer-section'>
                    {
                        questions[currentQuestion].answerOptions.map((answerOption,idx) => (
                            <button contentEditable="true" className={'create-answer-section-button '+(answerOption.isCorrect == true ? "create-correct" : "create-incorrect")} onClick={() => changeCorrectAnswer(idx)}>
                                <input className='answer-input'  value={answerOption.answerText} onChange={(e) => handleOptionsChange(e.target,idx)}/>
                            </button>
                        ))
                    }
                </div>
		    </div>
            <div className='create-options'>
                <IconContext.Provider value={{ color: '#7690da', size: '25px' }}>
                    <span><BsFillArrowLeftCircleFill onClick={() => moveNext(-1)}/></span>
                    <span><FaSave onClick={() => saveNewQuestionnaire()}/></span>
                    <span><FiPlus onClick={() => addNewQuestion()}/></span>
                    <span><BsFillArrowRightCircleFill onClick={() => moveNext(1)}/></span>
                </IconContext.Provider>  
            </div>
        </div>
	);
}

export default CreateQuiz