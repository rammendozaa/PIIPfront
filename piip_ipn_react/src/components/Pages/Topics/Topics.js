import {useState, useEffect} from 'react'
import Cards from './Cards'
import './Topics.css'

function Topics({userData}) {
    const [data, setData] = useState([]);
    const [option, setOption] = useState("");
    const getProgrammingTopics = async() => {
        const response = await fetch('/algorithmTopics',{
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + userData.token
            },
        })
        const data = await response.json()
        console.log("Vale kk")
        console.log(data)
        setData(data)
        setOption("algorithm")
    }
    const getSoftSkillsTopics = async() => {
        const response = await fetch('/softSkillsTopics',{
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + userData.token
            },
        })
        const data = await response.json()
        setData(data)
        setOption("soft-skill")
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
            <div className='topics-container'>
                <div className='search_wrap'>
                    <div className='search_box'>
                        <div className='btn btn-common'>
                            <i className='fas fa-search'></i> 
                        </div>
                        <input type="text" className='input' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search ...'></input>
                    </div>
                    <div className='options'>
                        <div className='option'>
                            <input type="radio" id="algorithms" name="activityType" value="algorithms" onChange={(e) => getProgrammingTopics()}/>
                            <label for="algorithms">Algorithms</label>
                        </div>
                        <div className='option'>
                            <input type="radio" id="soft" name="activityType" value="soft" onChange={(e) => getSoftSkillsTopics()}/>
                            <label for="soft">Soft Skills</label>
                        </div>
                    </div>
                </div>
                <Cards data={search(data)} route={option} userData={userData}/>
            </div>
        </>
    )
}

export default Topics