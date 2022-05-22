import {useState} from 'react'
import React, {useEffect} from 'react'
import "./AddSoftSkillQuestion.css"

const baseURL = "http://127.0.0.1:5000"

function AddSoftSkillQuestion({userData}) {
    const [title, setTitle] = useState("")
    const [question, setQuestion] = useState("")
    const [softSkillTopics, setSoftSkillTopics] = useState([])
    /*
    useEffect(() => {
        fetch(baseURL + `/softSkillsTopics`, {
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + userData.token
            },
        })
        .then(res => res.json())
        .then(data => {
            setSoftSkillTopics(data)
        })
    }, []);
    */
    const createSoftSkillQuestion = async () => {
        await fetch(baseURL + `/soft-skill-question`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "title": title,
                "question": question
            }),
        })
    }
    return (
        <>
        <div className='softkillq-container'>
            <div className='softskill'>
                <div className='softskill-l'>
                    <div className='ssTop'>
                        <h2 className='ssTitle'>Title</h2>
                        <textarea className='ssTitleTA' id="title" value={title} onChange={(e) => setTitle(e.target.value)}></textarea>
                    </div>
                    <div className='ssBottom'>
                        <h2 className='ssTitle'>Question</h2>
                        <textarea className='ssQuestionTA' id="question" value={question} onChange={(e) => setQuestion(e.target.value)}></textarea>
                        <button className='btn-create-activities2' buttonStyle="btn--outline" onClick={() => createSoftSkillQuestion()}>Add to soft skill questions</button>
                    </div>
                </div>
                <div className='softskill-r'>
                    <img src='/images/soft-skills.png'/>
                </div>
            </div>
        </div>
        </>
    );
}

export default AddSoftSkillQuestion