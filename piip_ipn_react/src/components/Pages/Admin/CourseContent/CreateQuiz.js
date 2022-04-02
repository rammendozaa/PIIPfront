import {useState} from 'react'
import './CreateQuiz.css'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import {IoIosAddCircle} from 'react-icons/io'
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
    const changeCorrectAnswer = () => {

    }
    return (
        <div className='create-quiz-container'>
            <div className='create-quiz'>
                <div className='create-question-section'>
                    <div className='create-question-count'>
                        <span>Question {currentQuestion + 1}</span>
                    </div>
                    <div className='question-text' contentEditable="true">
                        {questions[currentQuestion].questionText}
                    </div>
                </div>
                <div className='create-answer-section'>
                    {
                        questions[currentQuestion].answerOptions.map((answerOption) => (
                            <button contentEditable="true" className={'create-answer-section-button '+(answerOption.isCorrect == true ? "create-correct" : "create-incorrect")} onClick={() => changeCorrectAnswer()}>{answerOption.answerText}</button>
                        ))
                    }
                </div>
		    </div>
            <div className='create-options'>
                <IconContext.Provider value={{ color: '#7690da', size: '25px' }}>
                    <span><BsFillArrowLeftCircleFill /></span>
                    <span><IoIosAddCircle /></span>
                    <span><BsFillArrowRightCircleFill /></span>
                </IconContext.Provider>  
            </div>
        </div>
	);
}

export default CreateQuiz