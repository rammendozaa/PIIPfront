import { useSelector } from "react-redux"
import { useState } from 'react'
import "./Templates.css"
import { IconContext } from 'react-icons';
import { FiPlus } from 'react-icons/fi';
import { TiDelete } from 'react-icons/ti'
import Popup from '../../Admin/CourseContent/Popup';
import { useParams } from "react-router-dom";
import React, {useEffect} from 'react'

const baseURL = "http://127.0.0.1:5000"
const activityIdToName = {
    1:"Problem",
    2:"Topic",
    3:"Soft Skill Question",
    4:"Topic",
    5:"Interview",
    6:"Questionnaire",
}


function Templates({userData}) {
    const {template_id} = useParams();
    const [data, setData] = useState({
            "id": 11,
            "description": "o section",
            "name": "no section",
            "sections": [],
            "position": null
        });
    
    
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
        response = await fetch(`/activity/section/${templateSectionId}/activity/add`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "name": activity.name,
                "description": activity.description,
                "position": (current.sections[index].activities.length) + 1,
                "activityType": activity.typeId,
                "externalReference": activity.reference,
            }),
        })
        const newActivityResponse = await response.json()
        console.log(newActivityResponse)
        current.sections[index].activities = [
            ...current.sections[index].activities,
            newActivityResponse
        ]
        setData(prevState => ({
            ...prevState,
            current
        }))
    }

    const AddNewSection = async () => {
        if(!newSectionName){
            alert("Section name can't be empty")
            return;
        }
        var current = data;
        let response = null;
        response = await fetch(`/template/${template_id}/section/add`,{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "name": newSectionName,
                "description": newSectionName,
                "position": (current.sections.length) + 1
            }),
        })
        const newSectionResponse = await response.json()
        console.log(newSectionResponse)
        current.sections = [
            ...current.sections,
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
            await fetch(`/template/section/${sectionId}`, {
                method: "DELETE"
            })
            current.sections = current.sections.filter((item,idx) => idx != index)
            setData(prevState => ({
                ...prevState,
                current
            }))
        }
    }

    const deleteActivity = async (indexSection, indexActivity, sectionActivityId) => {
        if(window.confirm('Are you sure you want to delete this activity?')){
            var current = data;
            await fetch(`/template/section/activity/${sectionActivityId}`, {
                method: "DELETE"
            })
            current.sections[indexSection].activities = current.sections[indexSection].activities.filter((item,idx) => idx != indexActivity)
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
        fetch(`/template?template_id=${template_id}`,{
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            setData(data)
        });
    }, []);
    return (
        <>
            <div className='template-content-container'>
                <div className="template-content">
                    {data !== undefined && (<div className='template'> 
                        <h1 className='template-title'>{data.name}</h1>
                        <IconContext.Provider value={{ color: 'red', size: '25px' }}>
                            <div className='template-accordionSection'>
                                <div className='template-container'>
                                    {data.sections.map((section, indexSection) => {
                                        return (
                                        <>
                                            <div className='template-wrap' key={indexSection}>
                                                <h1 onClick={() => toggle(indexSection)}>{section.name}</h1>
                                                {userData.role === "super" && <span><TiDelete onClick={() => deleteSection(indexSection, section.id)}/></span>}
                                            </div>
                                            <div className='template-activities-container'>
                                            {
                                                clicked === indexSection 
                                                    ? 
                                                    (
                                                        section.activities.map((activity,indexActivity) => {
                                                            return (
                                                                <>
                                                                    <div className='template-dropdown' key={indexActivity}>
                                                                        <p><b>{activityIdToName[activity.activityType]}</b>: {activity.name}</p>
                                                                        {userData.role === "super" && <span><TiDelete onClick={() => deleteActivity(indexSection, indexActivity, activity.id)}/></span>}
                                                                    </div>                                                                
                                                                </>
                                                            )
                                                        })
                                                    ) 
                                                    : null
                                            }
                                            {
                                                clicked === indexSection && userData.role === "super"
                                                ?
                                                (
                                                    <div className='template-addNewActivity'>
                                                        <span>{<FiPlus onClick={() => prepareNewSection(indexSection, section.id) }/>}</span>
                                                    </div>
                                                )
                                                :null
                                            }
                                            </div>
                                        </>
                                        );
                                    })}
                                    {userData.role === "super" && <div className='template-addNewSection'>
                                        <input type='text' placeholder='Section Name' className='template-input' value={newSectionName} onChange={(e) => setNewSectionName(e.target.value)}/>
                                        <span>{<FiPlus onClick={() => AddNewSection()}/>}</span>
                                    </div>}
                                </div>
                            </div>
                        </IconContext.Provider>
                    </div>)}
                    <Popup showInterview={false} trigger={buttonPopup} setButtonPopup={setButtonPopup} userData={userData} functionToAddActivity={addNewActivity} activityIndex={newActivityIndex} sectionId={newActivitySectionId}/>
                </div>
            </div>
        </>
    )
}

export default Templates
