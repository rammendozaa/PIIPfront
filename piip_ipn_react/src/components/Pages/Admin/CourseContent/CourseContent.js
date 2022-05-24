import {useState} from 'react'
import "./CourseContent.css"
import { IconContext } from 'react-icons';
import { FiCheck, FiPlus, FiSlash, FiEdit3 } from 'react-icons/fi';
import { TiDelete } from 'react-icons/ti'
import Popup from './Popup';
import { useParams } from "react-router-dom";
import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom";
const baseURL = "http://127.0.0.1:5000"
const activityIdToName = {
    1:"Problem",
    2:"Algorithmic Topic",
    3:"Soft Skill Question",
    4:"Soft Skill Topic",
    5:"Interview",
    6:"Questionnaire",
}

function CourseContent({userData}) {
    const {user_id} = useParams();
    const [data, setData] = useState({"template":{"name":"Course Name"}, "user_sections":[]});
    const navigate = useNavigate();


    console.log("Token: ",userData.token)
    const [newActivityIndex, setNewActivityIndex] = useState(-1)
    const [newActivitySectionId, setNewActivitySectionId] = useState(-1)
    const [clicked, setClicked] = useState(-1);
    const [newSectionName, setNewSectionName] = useState("");
    const [buttonPopup, setButtonPopup] = useState(false);
    const toggle = index => {
        if (clicked === index) {
            //if clicked question is already active, then close it 2
            return setClicked(-1);
        }   
        setClicked(index);
    };


    const addNewActivity = async (activity, index, templateSectionId) => {

        var current = data;
        let response = null;
        if (activity.typeId == 5) {
            const admin_id = userData.user_id
            response = await fetch(baseURL + `/user/${user_id}/interview/${templateSectionId}`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "name": activity.name,
                    "description": activity.description,
                    "position": (current.user_sections[index].user_activities.length) + 1,
                    "activityType": activity.typeId,
                    "userAdminId": admin_id,
                    "interviewType": activity.reference,
                }),
            })
        } else {
            response = await fetch(baseURL + `/user/${user_id}/activity/${templateSectionId}`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "name": activity.name,
                    "description": activity.description,
                    "position": (current.user_sections[index].user_activities.length) + 1,
                    "activityType": activity.typeId,
                    "externalReference": activity.reference,
                }),
            })
        }
        const newActivityResponse = await response.json()
        console.log(newActivityResponse)
        current.user_sections[index].user_activities = [
            ...current.user_sections[index].user_activities,
            newActivityResponse
        ]
        setData(prevState => ({
            ...prevState,
            current
        }))
        alert("Activity added correctly!");
        setButtonPopup(false);
    }

    const deleteActivity = async (indexSection, indexActivity, sectionActivityId) => {
        if(window.confirm('Are you sure you want to delete this activity?')){
            var current = data;
            await fetch(baseURL + `/user/activity/${sectionActivityId}`, {
                method: "DELETE"
            })
            current.user_sections[indexSection].user_activities = current.user_sections[indexSection].user_activities.filter((item,idx) => idx != indexActivity)
            setData(prevState => ({
                ...prevState,
                current
            }))
        }
    }

    const AddNewSection = async (user_template_id) => {
        if(!newSectionName){
            alert("Section name can't be empty")
            return;
        }
        var current = data;
        const response = await fetch(baseURL + `/user/${user_id}/section/${user_template_id}`,{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "name": newSectionName,
                "description": newSectionName,
                "position": (current.user_sections.length) + 1
            }),
        })
        const newSectionResponse = await response.json()
        console.log(newSectionResponse)
        current.user_sections = [
            ...current.user_sections,
            newSectionResponse,
        ]
        setData(prevState => ({
            ...prevState,
            current
        }))
        setNewSectionName("")
    };

    const deleteSection = async (index, sectionId) => {
        if(window.confirm('Are you sure you want to delete this section?')){
            var current = data;
            await fetch(baseURL + `/user/section/${sectionId}`, {
                method: "DELETE"
            })
            current.user_sections = current.user_sections.filter((item,idx) => idx != index)
            setData(prevState => ({
                ...prevState,
                current
            }))
        }
    }

    const prepareNewSection = (index, templateSectionId) => {
        setNewActivityIndex(index)
        setNewActivitySectionId(templateSectionId)
        setButtonPopup(true)
    }

    useEffect(() => {
        fetch(baseURL + `/user/${user_id}/template`,{
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            setData(data)
        });
    }, []);

    const redirectToActivity = (activity) => {
        const activityType = activity.template_activity.activityType;
        const activity_id = activity.template_activity.activity.id;
        console.log("here")
        console.log(activityType)
        console.log("here")
        if (activityType == 1) {
            navigate(`/problem/${activity_id}`)
        } else if (activityType == 2) {
            navigate(`/topic/algorithm/${activity_id}`);
        } else if (activityType == 3) {
            navigate(`/soft-skill-question/${activity_id}`)
        } else if (activityType == 4) {
            navigate(`/topic/softskill/${activity_id}`);
        } else if (activityType == 5) {
            navigate(`/mock-interviews/${activity_id}`)
        } else if (activityType == 6) {
            navigate(`/solve-quiz/${activity_id}`)
        }
    }

    return (
        <>
            <div className='course-content-container'>
                {(data.template === undefined || data.template === null) && (
                    <div className='course-description'>
                        <h1 className='course-description-title'>Once this user finishes his questionnaire he'll be assigned a course. Wait!</h1>
                    </div>
                )}
                {data.template !== undefined && (<div className='course'> 
                    <h1 className='course-title'>{data.template.name}</h1>
                    <IconContext.Provider value={{ color: 'red', size: '25px' }}>
                        <div className='course-accordionSection'>
                            <div className='course-container'>
                                {data.user_sections.map((section, indexSection) => {
                                    return (
                                    <>
                                        <div className='course-wrap' onClick={() => toggle(indexSection)} key={indexSection}>
                                            <h1>
                                            {section.status_id === 4 &&
                                            <span>
                                                <IconContext.Provider value={{ color: "green", className: "global-class-name" }}>
                                                    <FiCheck/>
                                                </IconContext.Provider>
                                            </span>}
                                            {section.status_id === 1 &&
                                            <span>
                                                <IconContext.Provider value={{ color: "red", className: "global-class-name" }}>
                                                    <FiSlash/>
                                                </IconContext.Provider>
                                            </span>}
                                            {section.status_id !== 1 && section.status_id !== 4 &&
                                            <span>
                                                <IconContext.Provider value={{ color: "black", className: "global-class-name" }}>
                                                    <FiEdit3/>
                                                </IconContext.Provider>
                                            </span>}
                                                {section.template_section.name}</h1>
                                            <span><TiDelete onClick={() => deleteSection(indexSection, section.id)}/></span>
                                        </div>
                                        <div className='course-activities-container'>
                                        {
                                            clicked === indexSection 
                                                ? 
                                                (
                                                    section.user_activities.map((activity,indexActivity) => {
                                                        return (
                                                            <>
                                                                <div className='course-dropdown' onClick={() => redirectToActivity(activity)} key={indexActivity}>
                                                                    <p><b>
                                                                        {activity.status_id === 4 && <span>
                                                                            <IconContext.Provider value={{ color: "green", className: "global-class-name" }}>
                                                                                <FiCheck/>
                                                                            </IconContext.Provider>
                                                                        </span>}
                                                                        {activity.status_id === 1 && <span>
                                                                            <IconContext.Provider value={{ color: "red", className: "global-class-name" }}>
                                                                                <FiSlash/>
                                                                            </IconContext.Provider>
                                                                        </span>}
                                                                        {activity.status_id !== 1 && activity.status_id !== 4 && <span>
                                                                            <IconContext.Provider value={{ color: "black", className: "global-class-name" }}>
                                                                                <FiEdit3/>
                                                                            </IconContext.Provider>
                                                                        </span>}
                                                                        {activityIdToName[activity.template_activity.activityType]}</b>: {activity.template_activity.name}</p>
                                                                    <span><TiDelete onClick={() => deleteActivity(indexSection, indexActivity, activity.id)}/></span>
                                                                </div>                                                                
                                                            </>
                                                        )
                                                    })
                                                ) 
                                                : null
                                        }
                                        {
                                            clicked === indexSection
                                            ?
                                            (
                                                <div className='course-addNewActivity'>
                                                    <span>{<FiPlus onClick={() => prepareNewSection(indexSection, section.id) }/>}</span>
                                                </div>
                                            )
                                            :null
                                        }
                                        </div>
                                    </>
                                    );
                                })}
                                <div className='course-addNewSection'>
                                    <input type='text' placeholder='Section Name' className='course-input' value={newSectionName} onChange={(e) => setNewSectionName(e.target.value)}/>
                                    <span>{<FiPlus onClick={() => AddNewSection(data.id)}/>}</span>
                                </div>
                            </div>
                        </div>
                    </IconContext.Provider>
                </div>)}
                <Popup
                    trigger={buttonPopup}
                    setButtonPopup={setButtonPopup}
                    userData={userData}
                    functionToAddActivity={addNewActivity}
                    showInterview={true}
                    activityIndex={newActivityIndex}
                    sectionId={newActivitySectionId}
                    userId={user_id}
                />
            </div>
        </>
    )
}

export default CourseContent
