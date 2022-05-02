import {useState} from 'react'
import React, {useEffect} from 'react'
const baseURL = "http://127.0.0.1:5000"


function AddSoftSkillQuestion(userData) {
    /*
                <div className='form-inputs'>
                    <label htmlFor='school' className='form-label'>                        
                        School
                    </label>
                    <select
                        id="school_id"
                        name  = "school_id"
                        className='select-school'
                        onChange={handleChange}
                        value={values.school_id}
                    >
                        {
                            schools && schools.map(opt => <option value={opt.id} key={opt.id}>{opt.name}</option>)
                        }
                    </select>
                    {errors.school && <p>{errors.school}</p>}
                </div>
    */
    const [softSkillTopics, setSoftSkillTopics] = useState([])
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
    
    const createSoftSkillQuestion = async () => {
        await fetch(baseURL + `/soft-skill-question`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "title": "titulo",
                "question": "question?",
                "soft_skill_topic_id": 1,
            })
        })
    }


    return <h1>Here we add a question</h1>
}

export default AddSoftSkillQuestion