import {useState, useEffect} from 'react'
import { NewActivity } from '../../../../externalClasses';
import Cards from './Cards'
import './SeeTopics.css'

function SeeTopics({userData, addActivity, activityIndex, sectionId, userId}) {
    const [data, setData] = useState([]);

    const getProgrammingTopics = async() => {
        const response = await fetch(`/algorithmTopics?user_id=${userId}`,{
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + userData.token
            },
        })
        const data = await response.json()
        setData(data)
    }

    useEffect(() => {
        getProgrammingTopics()
    },[]);

    const [query, setQuery] = useState("");

    function search(rows){
        return rows.filter(
            row => row.title.toLowerCase().indexOf(query.toLowerCase()) > -1
        )
    }

    const addProgrammingTopic = (topic) => {
        const newAct = NewActivity(topic.title, topic.description, 2, topic.id);
        addActivity(newAct, activityIndex, sectionId);
    }

    return (
        <>
            <div className='see-topics-container'>
                <div className='search_wrap'>
                    <div className='search_box'>
                        <div className='btn btn-common'>
                            <i className='fas fa-search'></i> 
                        </div>
                        <input type="text" className='input' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search ...'></input>
                    </div>
                </div>
                <Cards data={search(data)} execute={addProgrammingTopic}/>
            </div>
        </>
    )
}

export default SeeTopics