import {useState} from 'react'
import "./CourseContent.css"
import { IconContext } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';

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
            ]
        }
    );
    const [clicked, setClicked] = useState(false);
    const toggle = index => {
        if (clicked === index) {
        //if clicked question is already active, then close it
        return setClicked(null);
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