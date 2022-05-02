import {useEffect, useState} from 'react'
import "./MyCourseContent.css"
import { useParams } from "react-router-dom";
import { IconContext } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';
import StartingQuiz from '../StartingQuiz/StartingQuiz';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { setUserTemplate } from "../../../../state/reducers/template"
import { setUserActivityInfo } from "../../../../state/reducers/activity"
import { ActivityInfo } from "../../../../../src/externalClasses"


const baseURL = "http://127.0.0.1:5000"

function CourseContent({userData}) {
    const dispatch = useDispatch();
    const user_id = userData.user_id;
    const navigate = useNavigate();
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
    // TODO - CHANGE QUESTIONNAIREID HERE
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
            setData(data);
            dispatch(setUserTemplate(data));
        });
    },[user_id]);

    const toggle = index => {
        if (clicked === index) {
            //if clicked question is already active, then close it
            return setClicked(-1);
        }   
        setClicked(index);
    };

    const redirectToActivity = (activity) => {
        const activity_id = activity.template_activity.activity.id
        const activityInfo = ActivityInfo(
            activity.id,
            activity.template_activity,
            activity.template_activity.activity,
        );
        const activityType = activity.template_activity.activityType;
        console.log("this is the actvity")
        console.log(activity_id)
        dispatch(setUserActivityInfo(activityInfo));
        if (activityType == 1) {
            navigate(`/problem/${activity_id}`)
        } else if (activityType == 2) {
            navigate(`/topic/algorithm/${activity_id}`);
        } else if (activityType == 3) {
            navigate(`/soft-skill-question/${activity_id}`)
        } else if (activityType == 4) {
            navigate(`/topic/softskill/${activity_id}`);
        } else if (activityType == 5) {
            navigate(`/mock-interviews`)
        } else if (activityType == 6) {
            navigate(`/solve-quiz/${activity_id}`)
        }
    }

    if (data.template === undefined) { // hasn't solved initial quiz
        return (
            <div className='course-content-container'>
                <h1>{descriptionText}</h1>
                <StartingQuiz userData={userData} questionnaire={baseQuestionnaire} description={true} descriptionText={"Thanks! We'll get back to you soon!"} setDescriptionText={setDescriptionText}/>
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
                                                                <div className='Dropdown' onClick={() => redirectToActivity(
                                                                    activity)} key={indexActivity}>
                                                                    <p><b>{activity.template_activity.name}</b></p>
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
