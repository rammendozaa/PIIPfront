import {useEffect, useState} from 'react'
import './SeeSoftSkillTopics.css'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import {FaSave} from 'react-icons/fa'
import { IconContext } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { TiDelete } from 'react-icons/ti'
import { NewActivity } from '../../../../../src/externalClasses'
const baseURL = "http://127.0.0.1:5000"

function SeeSoftSkillTopics({userData, addActivity, activityIndex, sectionId}) {
    const [topics, setTopics] = useState([])

    const fetchSoftSkillTopics = async() => {
        fetch(baseURL + `/softSkillsTopics`,{
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + userData.token
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setTopics(data)
        })
    }
    useEffect(() => {
        fetchSoftSkillTopics()
    }, []);

    const addSoftSkillTopic = (topic, index) => {
        const newAct = NewActivity(topic.title, topic.description, 4, topic.id);
        addActivity(newAct, activityIndex, sectionId);
    }

    return (
        <div className='div-table'>
            <table className='content-table'>
                <thead>
                    <tr>
                    <th>Soft Skills Topics:</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        topics.map((topic, index) => 
                            <tr>
                                <td className='tdd'>
                                {topic['title']}
                                <IconContext.Provider value={{ color: "#009879", size: '25px' }}>
                                    {
                                    <FiPlus onClick={() => addSoftSkillTopic(topic, index)}/>
                                    }
                                </IconContext.Provider>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default SeeSoftSkillTopics