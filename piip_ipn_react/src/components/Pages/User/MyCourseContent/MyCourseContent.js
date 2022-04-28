import {useEffect, useState} from 'react'
import "./MyCourseContent.css"
import { useParams } from "react-router-dom";
import { IconContext } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';
import Quiz from '../Quiz/Quiz';

const baseURL = "http://127.0.0.1:5000"

function CourseContent({userData}) {
    const user_id = userData.user_id;
    const [data, setData] = useState({"template":{"name":"Course Name"}, "user_sections":[]});
    const [clicked, setClicked] = useState(-1);
    const [administratorId, setAdministratorId] = useState(-1);
    const [descriptionText, setDescriptionText] = useState("Please answer this quiz so that we know what's the perfect study plan for you! ;)")
    const [baseQuestionnaire, setBaseQuestionnaire] = useState({
        "title": "first questionnaire",
        "description": "this is the first",
        "questions": [
            {
                "questionText": "Question 1",
                "answerOptions": [
                    {
                        "answerText": "this is not answer 1",
                        "isCorrect": false
                    },{
                        "answerText": "this is answer",
                        "isCorrect": true
                    },{
                        "answerText": "this is not answer 2",
                        "isCorrect": false
                    },{
                        "answerText": "this is not answer 3",
                        "isCorrect": false
                    }
                ]
            }
       ]
    });
    useEffect(() => {
        fetch(baseURL + `/questionnaire?questionnaireId=7`,{
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            setBaseQuestionnaire(data)
        });
        fetch('/get-admin',{
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + userData.token
            },
        })
        .then(res => res.json())
        .then(data => {
            setAdministratorId(data.administrator_id)
        });
        fetch(baseURL + `/user/${user_id}/template`,{
            method:"GET",
        })
        .then(res => res.json())
        .then(data => {
            setData(data)
        });
    },[user_id]);

    const toggle = index => {
        if (clicked === index) {
            //if clicked question is already active, then close it
            return setClicked(-1);
        }   
        setClicked(index);
    };
    console.log(administratorId)
    if (data.template === undefined) { // hasn't solved initial quiz
        return (
            <div className='course-content-container'>
                <h1>{descriptionText}</h1>
                <Quiz userData={userData} questionnaire={baseQuestionnaire} description={true} descriptionText={"Thanks! We'll get back to you soon!"} setDescriptionText={setDescriptionText}/>
            </div>
        )
    }

    if(administratorId === -1){
        return (
            <div className='course-content-container'>
                <h1 className='sorry'>Sorry, you do not yet have a mentor assigned to you. <p>We're contacting them so don't worry!</p></h1>
                <img src='/images/sorry-removebg-preview.png'></img>
            </div>
        )
    }

    return (
        <>
            <div className='course-content-container'>
                <div className='course'> 
                    <h1 className='course-title'> {data.template.name} </h1>
                    <IconContext.Provider value={{ color: '#00FFB9', size: '25px' }}>
                        <div className='AccordionSection'>
                            <div className='Container'>
                                {data.user_sections.map((section, indexSection) => {
                                    return (
                                    <>
                                        <div className='Wrap' onClick={() => toggle(indexSection)} key={indexSection}>
                                            <h1>{section.template_section.name}</h1>
                                            <span>{clicked === indexSection ? <FiMinus /> : <FiPlus />}</span>
                                        </div>
                                        <div className='activities-container'>
                                        {
                                            clicked === indexSection 
                                                ? 
                                                (
                                                    section.user_activities.map((activity,indexActivity) => {
                                                        return (
                                                            <>
                                                                <div className='Dropdown' key={indexActivity}>
                                                                    <p><b>{activity.template_activity.name}</b>: {activity.template_activity.description}</p>
                                                                </div>                                                                
                                                            </>
                                                        )
                                                    })
                                                ) 
                                                : null
                                        }
                                        </div>
                                    </>
                                    );
                                })}
                            </div>
                        </div>
                    </IconContext.Provider>
                </div>
            </div>
        </>
    )
}

export default CourseContent