import {useEffect, useState} from 'react'
import './SeeAlgorithmTopics.css'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import {FaSave} from 'react-icons/fa'
import { IconContext } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { TiDelete } from 'react-icons/ti'
import { NewActivity } from '../../../../../src/externalClasses'
const baseURL = "http://127.0.0.1:5000"

function SeeAlgorithmTopics({userData, addActivity, activityIndex, sectionId}) {
    const [topics, setTopics] = useState([])

    const fetchAlgorithmTopics = async() => {
        fetch(`/algorithmTopics`,{
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + userData.token
            },
        })
        .then(res => res.json())
        .then(data => {
            setTopics(data)
        })
    }
    useEffect(() => {
        fetchAlgorithmTopics()
    }, []);

    const addAlgorithmTopic = (topic, index) => {
        const newAct = NewActivity(topic.title, topic.description, 2, topic.id);
        addActivity(newAct, activityIndex, sectionId);
    }

    return (
        <div className='div-table'>
            <table className='content-table'>
                <thead>
                    <tr>
                    <th>Algorithm Topics:</th>
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
                                    <FiPlus onClick={() => addAlgorithmTopic(topic, index)}/>
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

export default SeeAlgorithmTopics