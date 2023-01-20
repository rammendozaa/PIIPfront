import React, { useState, useEffect } from 'react'
import './AddSoftSkillQuestion.css'
import RequestError from '../../../RequestError'

const baseURL = 'http://127.0.0.1:5000'

function AddSoftSkillQuestion ({ userData }) {
  const [title, setTitle] = useState('')
  const [question, setQuestion] = useState('')
  const [softSkillTopics, setSoftSkillTopics] = useState([])
  const [errorCode, setErrorCode] = useState(null)
  /*
    useEffect(() => {
        fetch(`/softSkillsTopics`, {
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
    const response = await fetch('/soft-skill-question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token,
        'User-Type': userData.role,
        'User-Id': userData.user_id,
      },
      body: JSON.stringify({
        title,
        question,
        createdBy: userData.user_id
      })
    })
    if (response.status !== 200) {
      setErrorCode(response.status)
      return
    }
    alert('Question saved correctly!')
    setTitle('')
    setQuestion('')
  }

  if (errorCode !== null) {
    return <RequestError errorCode={errorCode}/>
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
                    <img src='/images/soft-skills.avif'/>
                </div>
            </div>
        </div>
        </>
  )
}

export default AddSoftSkillQuestion
