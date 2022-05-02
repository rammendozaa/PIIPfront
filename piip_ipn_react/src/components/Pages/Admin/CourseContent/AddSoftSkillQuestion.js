import {useState} from 'react'
import React, {useEffect} from 'react'
const baseURL = "http://127.0.0.1:5000"


function AddSoftSkillQuestion({userData}) {
    const [title, setTitle] = useState("")
    const [question, setQuestion] = useState("")
    const [topicId, setTopicId] = useState(1)
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
                "question": question,
                "soft_skill_topic_id": topicId,
            }),
        })
    }


    return (
        <>
        <div>
            <h1>Add a question related to one of the topics available</h1>
            <h2>Title</h2>
            <textarea id="title" value={title} onChange={(e) => setTitle(e.target.value)}></textarea>
            <h2>Question</h2>
            <textarea id="question" value={question} onChange={(e) => setQuestion(e.target.value)}></textarea>
            <button buttonStyle="btn--outline" onClick={() => createSoftSkillQuestion()}>Add to soft skill questions</button>
        </div>
        </>
    );
}

export default AddSoftSkillQuestion