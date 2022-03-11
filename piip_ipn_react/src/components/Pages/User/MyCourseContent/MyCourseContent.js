import {useState} from 'react'
import "./MyCourseContent.css"
import { IconContext } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';

function CourseContent({token}) {
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
    const [clicked, setClicked] = useState(-1);    const [administratorId, setAdministratorId] = useState(-1);
    fetch('/get-admin',{
        method: "GET",
        headers: {
            "Authorization": 'Bearer ' + token
        },
    })
    .then(res => res.json())
    .then(data => {
        setAdministratorId(data.administrator_id)
    });
    if(administratorId === -1){
        return (
            <div className='course-content-container'>
                <h1 className='sorry'>Sorry, you do not yet have a mentor or a course assigned to you.</h1>
                <img src='/images/sorry-removebg-preview.png'></img>
            </div>
        )
    }
    const toggle = index => {
        if (clicked === index) {
            //if clicked question is already active, then close it
            return setClicked(-1);
        }   
        setClicked(index);
    };
    return (
        <>
            <div className='course-content-container'>
                <div className='course'> 
                    <h1 className='course-title'> {data.CourseName} </h1>
                    <IconContext.Provider value={{ color: '#00FFB9', size: '25px' }}>
                        <div className='AccordionSection'>
                            <div className='Container'>
                                {data.Sections.map((section, indexSection) => {
                                    return (
                                    <>
                                        <div className='Wrap' onClick={() => toggle(indexSection)} key={indexSection}>
                                            <h1>{section.SectionName}</h1>
                                            <span>{clicked === indexSection ? <FiMinus /> : <FiPlus />}</span>
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