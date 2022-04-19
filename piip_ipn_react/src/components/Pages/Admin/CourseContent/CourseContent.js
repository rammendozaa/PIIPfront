import {useState} from 'react'
import "./CourseContent.css"
import { IconContext } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { TiDelete } from 'react-icons/ti'
import Popup from './Popup';
import { useParams } from "react-router-dom";
import React, {useEffect} from 'react'
const baseURL = "http://127.0.0.1:5000"


function CourseContent({userData}) {
    const {user_id} = useParams();
    console.log(user_id)
    const [data, setData] = useState({"template":{"name":"Course Name"}, "user_sections":[]});


    console.log("Token: ",userData.token)
    const [activityToAdd, setActivityToAdd] = useState(null)
    const [newActivityIndex, setNewActivityIndex] = useState(-1)
    const [newActivitySectionId, setNewActivitySectionId] = useState(-1)
    const [clicked, setClicked] = useState(-1);
    const [newSectionName, setNewSectionName] = useState("");
    const [buttonPopup, setButtonPopup] = useState(false);
    const toggle = index => {
        if (clicked === index) {
            //if clicked question is already active, then close it
            return setClicked(-1);
        }   
        setClicked(index);
    };


    const addNewActivity = async (activity, index, templateSectionId) => {

        var current = data;
        console.log(" actstsa " + activity.name + " " + activity.description + " " + activity.id + " " + activity.reference);

        const response = await fetch(baseURL + `/user/${user_id}/activity/${templateSectionId}`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "name": activity.name,
                "description": activity.description,
                "position": (current.user_sections[index].user_activities.length) + 1,
                "activityType": activity.id,
                "externalReference": activity.reference,
            }),
        })
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
    }

    const deleteActivity = async (indexSection, indexActivity, sectionActivityId) => {
        if(window.confirm('Are you sure you want to delete this activity?')){
            var current = data;
            await fetch(baseURL + `/user/activity/${sectionActivityId}/delete`, {
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
            await fetch(baseURL + `/user/section/${sectionId}/delete`, {
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
            method:"GET",
        })
        .then(res => res.json())
        .then(data => {
            setData(data)
        });
    }, []);

    return (
        <>
            <div className='course-content-container'>
                {(data.template === undefined || data.template === null) && (
                    <div className='course'>
                        <h1 className='course-title'>Once this user finishes his questionnaire he'll be assigned a questionnaire. Wait!</h1>
                    </div>
                )}
                {data.template !== undefined && (<div className='course'> 
                    <h1 className='course-title'>{data.template.name}</h1>
                    <IconContext.Provider value={{ color: 'red', size: '25px' }}>
                        <div className='AccordionSection'>
                            <div className='Container'>
                                {data.user_sections.map((section, indexSection) => {
                                    return (
                                    <>
                                        <div className='Wrap' key={indexSection}>
                                            <h1 onClick={() => toggle(indexSection)}>{section.template_section.name}</h1>
                                            <span><TiDelete onClick={() => deleteSection(indexSection, section.id)}/></span>
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
                                                                    <p>{activity.template_activity.name}</p>
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
                                                <div className='AddNewActivity'>
                                                    <span>{<FiPlus onClick={() => prepareNewSection(indexSection, section.id) }/>}</span>
                                                </div>
                                            )
                                            :null
                                        }
                                        </div>
                                    </>
                                    );
                                })}
                                <div className='AddNewSection'>
                                    <input type='text' placeholder='Section Name' className='input' value={newSectionName} onChange={(e) => setNewSectionName(e.target.value)}/>
                                    <span>{<FiPlus onClick={() => AddNewSection(data.id)}/>}</span>
                                </div>
                            </div>
                        </div>
                    </IconContext.Provider>
                </div>)}
                <Popup trigger={buttonPopup} setButtonPopup={setButtonPopup} userData={userData} functionToAddActivity={addNewActivity} activityIndex={newActivityIndex} sectionId={newActivitySectionId}/>
            </div>
        </>
    )
}

export default CourseContent


export const NewActivity = (name, description, id, reference) => {
    return {
        name: name,
        description: description,
        id: id,
        reference: reference,
    }
}
