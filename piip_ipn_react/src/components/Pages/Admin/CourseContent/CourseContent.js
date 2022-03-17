import {useState} from 'react'
import "./CourseContent.css"
import { IconContext } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { TiDelete } from 'react-icons/ti'
import Popup from './Popup';

function CourseContent() {
    const [data, setData] = useState(
        {
            "CourseName": "Basic Course",
            "Sections": [
                {
                    "SectionName": "Section 1",
                    "Activities": [
                        {"ActivityName": "S1 A1", "Description": "Perro"},
                        {"ActivityName": "S1 A2", "Description": "Perro"}
                    ]
                },
                {
                    "SectionName": "Section 2",
                    "Activities": [
                        {"ActivityName": "S2 A1", "Description": "Perro"},
                        {"ActivityName": "S2 A2", "Description": "Perro"}
                    ]
                },
                {
                    "SectionName": "Section 3",
                    "Activities": [
                        {"ActivityName": "S2 A1", "Description": "Perro"},
                        {"ActivityName": "S2 A2", "Description": "Perro"}
                    ]
                },
                {
                    "SectionName": "Section 4",
                    "Activities": [
                        {"ActivityName": "S2 A1", "Description": "Perro"},
                        {"ActivityName": "S2 A2", "Description": "Perro"}
                    ]
                },
                {
                    "SectionName": "Section 5",
                    "Activities": [
                        {"ActivityName": "S2 A1", "Description": "Perro"},
                        {"ActivityName": "S2 A2", "Description": "Perro"}
                    ]
                },
                {
                    "SectionName": "Section 6",
                    "Activities": [
                        {"ActivityName": "S2 A1", "Description": "Perro"},
                        {"ActivityName": "S2 A2", "Description": "Perro"}
                    ]
                },
                {
                    "SectionName": "Section 7",
                    "Activities": [
                        {"ActivityName": "S2 A1", "Description": "Perro"},
                        {"ActivityName": "S2 A2", "Description": "Perro"}
                    ]
                },
                {
                    "SectionName": "Section 8",
                    "Activities": [
                        {"ActivityName": "S2 A1", "Description": "Perro"},
                        {"ActivityName": "S2 A2", "Description": "Perro"}
                    ]
                },
            ]
        }
    );
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
    const addNewActivity = (index) => {
        var current = data;
        current.Sections[index].Activities = [...current.Sections[index].Activities,
            {"ActivityName": "New Activity", "Description": "Perro"}
        ]
        setData(prevState => ({
            ...prevState,
            current
        }))
    }
    const deleteActivity = (indexSection, indexActivity) => {
        if(window.confirm('Are you sure you want to delete this activity?')){
            var current = data;
            current.Sections[indexSection].Activities = current.Sections[indexSection].Activities.filter((item,idx) => idx != indexActivity)
            setData(prevState => ({
                ...prevState,
                current
            }))
        }
    }
    const AddNewSection = () => {
        if(!newSectionName){
            alert("Section name can't be empty")
            return;
        }
        var current = data;
        current.Sections = [...current.Sections,
            {
                "SectionName": newSectionName,
                "Activities": []
            },
        ]
        setData(prevState => ({
            ...prevState,
            current
        }))
    }
    const deleteSection = (index) => {
        if(window.confirm('Are you sure you want to delete this section?')){
            var current = data;
            current.Sections = current.Sections.filter((item,idx) => idx != index)
            setData(prevState => ({
                ...prevState,
                current
            }))
        }
    }
    return (
        <>
            <div className='course-content-container'>
                <div className='course'> 
                    <h1 className='course-title'> {data.CourseName} </h1>
                    <IconContext.Provider value={{ color: 'red', size: '25px' }}>
                        <div className='AccordionSection'>
                            <div className='Container'>
                                {data.Sections.map((section, indexSection) => {
                                    return (
                                    <>
                                        <div className='Wrap' key={indexSection}>
                                            <h1 onClick={() => toggle(indexSection)}>{section.SectionName}</h1>
                                            <span><TiDelete onClick={() => deleteSection(indexSection)}/></span>
                                        </div>
                                        <div className='activities-container'>
                                        {
                                            clicked === indexSection 
                                                ? 
                                                (
                                                    section.Activities.map((activity,indexActivity) => {
                                                        return (
                                                            <>
                                                                <div className='Dropdown' key={indexActivity}>
                                                                    <p>{activity.ActivityName}</p>
                                                                    <span><TiDelete onClick={() => deleteActivity(indexSection, indexActivity)}/></span>
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
                                                <div className='AddNewActivity' onClick={() => addNewActivity(indexSection)}>
                                                    <span>{<FiPlus onClick={() => setButtonPopup(true) }/>}</span>
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
                                    <span>{<FiPlus onClick={() => AddNewSection()}/>}</span>
                                </div>
                            </div>
                        </div>
                    </IconContext.Provider>
                </div>
            </div>
            <Popup trigger={buttonPopup} setButtonPopup={setButtonPopup}>
                <h1>hola</h1>
            </Popup>
        </>
    )
}

export default CourseContent