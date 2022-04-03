import {useState} from 'react'
import './CreateQuiz.css'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import {FaSave} from 'react-icons/fa'
import { IconContext } from 'react-icons';

function CreateQuiz(props) {
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
    const moveNext = (add) => {
        if(currentQuestion+add < 0){
            setCurrentQuestion(0);
            console.log(0)
        }else if(currentQuestion+add >= questions.length){
            console.log(1);
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
            setCurrentQuestion(currentQuestion+add);
        }else{
            console.log(2)
            setCurrentQuestion(currentQuestion+add)
        }
    }
    return (
        <div className='create-quiz-container'>
            <div className='create-quiz'>
                <div className='create-question-section'>
                    <div className='create-question-count'>
                        <span>Question {currentQuestion + 1}</span>/{questions.length}
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
                    <span><FaSave /></span>
                    <span><BsFillArrowRightCircleFill onClick={() => moveNext(1)}/></span>
                </IconContext.Provider>  
            </div>
        </div>
	);
}

export default CreateQuiz