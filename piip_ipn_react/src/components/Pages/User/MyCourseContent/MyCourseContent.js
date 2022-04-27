import {useEffect, useState} from 'react'
import "./MyCourseContent.css"
import { useParams } from "react-router-dom";
import { IconContext } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';
const baseURL = "http://127.0.0.1:5000"

function CourseContent({userData}) {
    const user_id = userData.user_id;
    const [data, setData] = useState({"template":{"name":"Course Name"}, "user_sections":[]});
    const [clicked, setClicked] = useState(-1);
    const [administratorId, setAdministratorId] = useState(-1);
    const toggle = index => {
        if (clicked === index) {
            //if clicked question is already active, then close it
            return setClicked(-1);
        }   
        setClicked(index);
    };
    useEffect(() => {
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
    },[]);
    useEffect(() => {
        fetch(baseURL + `/user/${user_id}/template`,{
            method:"GET",
        })
        .then(res => res.json())
        .then(data => {
            setData(data)
        });
    }, [user_id]);

    if(administratorId === -1){
        return (
            <div className='course-content-container'>
                <h1 className='sorry'>Sorry, you do not yet have a mentor or a course assigned to you.</h1>
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