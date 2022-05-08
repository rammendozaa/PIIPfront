import {useState, useEffect} from 'react'
import Cards from './Cards'
import './SeeTopics.css'

function SeeSoftSkills({userData}) {
    const [data, setData] = useState([]);

    const getProgrammingTopics = async() => {
        const response = await fetch('/softSkillsTopics',{
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + userData.token
            },
        })
        const data = await response.json()
        console.log("Vale kk")
        console.log(data)
        setData(data)
    }

    useEffect(() => {
        getProgrammingTopics()
    },[]);

    const [query, setQuery] = useState("");

    function search(rows){
        console.log(rows);
        return rows.filter(
            row => row.title.toLowerCase().indexOf(query.toLowerCase()) > -1
        )
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
                <Cards data={search(data)}/>
            </div>
        </>
    )
}

export default SeeSoftSkills