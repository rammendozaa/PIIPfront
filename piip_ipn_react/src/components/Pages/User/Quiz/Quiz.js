import { useNavigate } from "react-router-dom";
import {useState} from 'react'
import './Quiz.css'
const baseURL = "http://127.0.0.1:5000"


function Quiz({userData, questionnaire, description, descriptionText, setDescriptionText}) {
    const navigate = useNavigate();
    const userId = userData.user_id
	const questions = questionnaire["questions"];
    const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const submitScore = async (actual_score) => {
		if (description) {
			setDescriptionText(descriptionText)
		}
		console.log("scoreood " + actual_score)
		const response = await fetch(
			baseURL + `/user/${userId}/questionnaire/${questionnaire["id"]}/assign`, {
			method: "PUT",
			mode: "cors",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				"correctAnswers": actual_score,
			}),
		})
		const response_json = await response.json();
		console.log(response_json)
		setTimeout(() => {  window.location.reload(); }, 2000);
	}
	const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
		    setScore(score + 1);
		}
		if (currentQuestion + 1 === questions.length) {
			if (isCorrect) {
				submitScore(score + 1);
			} else {
				submitScore(score);
			}
			setShowScore(true)
		}
	    const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		}
	};

    return (
        <div className='quiz-container'>
            <div className='quiz'>
                {showScore ? (
                    <div className='score-section'>
                        You answered {score} questions correctly out of {questions.length}!
                    </div>
                ) : (
                    <>
                        <div className='question-section'>
                            <div className='question-count'>
                                <span>Question {currentQuestion + 1}</span>/{questions.length}
                            </div>
                            <div className='question-text'>{questions[currentQuestion]["questionText"]}</div>
                        </div>
                        <div className='answer-section'>
                            {questions[currentQuestion]["answerOptions"].map((answerOption) => (
                                <button className='answer-section-button' onClick={() => handleAnswerOptionClick(answerOption["isCorrect"])}>{answerOption.answerText}</button>
                            ))}
                        </div>
                    </>
                )}
		    </div>
        </div>
	);
}

export default Quiz