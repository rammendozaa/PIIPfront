import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development';
import {useState} from 'react'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux"
import "./SoftSkillQuestion.css"
const baseURL = "http://127.0.0.1:5000"


function SoftSkillQuestion({userData}) {
    const navigate = useNavigate()
    const userId = userData.user_id;
    const {activity, activity_progress} = useSelector(state => state.userActivity);
    const {question_id} = useParams();
    const [question, setQuestion] = useState("Is this a question?");
    const [answer, setAnswer] = useState("")

    const updateUserTemplateActivity = async (user_activity_id, status_id) => {
        await fetch(
          baseURL + `/user/activity/${user_activity_id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              "statusId": status_id,
          }),
        })
      }
    

    const saveQuestionProgress = async(status_id) => {
        await fetch(
            baseURL + `/user/${userId}/soft-skill-question/${question_id}`, {
              method: "PUT",
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                "statusId": status_id,
                "answer":answer,
            }),
        })
    }
    const handleQuestionUpdate = async(status_id) => {
        if (userData.role === "user") {
            saveQuestionProgress(status_id);
            if ((activity !== undefined && activity !== null) && activity.user_activity_id) {
                updateUserTemplateActivity(activity.user_activity_id,status_id);
              }
        }
    }

    useEffect(() => {
        if ((activity !== undefined && activity !== null) && activity["question"]) {
            setQuestion(activity["question"])
            setAnswer(activity_progress["answer"])
        } else {
            fetch(`/soft-skill-question?questionId=${question_id}`, {
                method: "GET",
            })
            .then(res => res.json())
            .then(data => {
                setQuestion(data["question"])
            })
        }
        handleQuestionUpdate(2);
    }, []);

    return (
        <>
            <div className='main-container'>
                {(userData.role !== "user") && 
                    <div><h2>This is the question</h2><h1>{question}</h1></div>
                }
                {(userData.role === "user") && 
                <div>
                    <h2>Please respond to the following statement to the best of your abilities. Remember that you can save and come back later.</h2>
                    <h1>{question}</h1>
                    <textarea
                            id="input"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}>
                    </textarea>
                    <button buttonStyle="btn--outline" onClick={() => saveQuestionProgress(2)}>Save</button>
                    <button buttonStyle="btn--outline" onClick={() => handleQuestionUpdate(4)}>I'm done!</button>
                    <button buttonStyle="btn--outline" onClick={() => navigate(`/my-course`)}>Go back to my course</button>
                </div>}
            </div>
        </>
    )
}

export default SoftSkillQuestion