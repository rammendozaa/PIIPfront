import {useState, useEffect} from 'react'
import Cards from './Cards'
import './Topics.css'

function Topics({userData}) {
    const [data, setData] = useState([
        {
            "src" : "images/img-1.svg",
            "text" : "Greedy is an algorithmic paradigm that builds up a solution piece by piece, always choosing the next piece that offers the most obvious and immediate benefit. So the problems where choosing locally optimal also leads to global solution are best fit for Greedy.",
            "label" : "Greedy",
            "path" : "/greedy"
        },
        {
            "src" : "images/img-2.svg",
            "text" : "Dynamic programming is both a mathematical optimization method and a computer programming method. The method was developed by Richard Bellman in the 1950s and has found applications in numerous fields, from aerospace engineering to economics.",
            "label" : "DP",
            "path" : "/dp"
        },
        {
            "src" : "images/img-4.svg",
            "text" : "Graphs",
            "label" : "Graphs",
            "path" : "/topic"
        },
    ]);

    useEffect(() => {
        fetch('/algorithmTopics',{
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + userData.token
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        });
    },[]);

    const [query, setQuery] = useState("");
    const [option,setOption] = useState("")

    function search(rows){
        return rows.filter(
            row => row.label.toLowerCase().indexOf(query.toLowerCase()) > -1
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
                </div>
                <div className='options'>
                    <input type="radio" id="algorithms" name="activityType" value="algorithms" onChange={(e) => setOption(e.target.value)} checked/>
                    <label for="algorithms">Algorithms</label>
                    <input type="radio" id="soft" name="activityType" value="soft" onChange={(e) => setOption(e.target.value)}/>
                    <label for="soft">Soft Skills</label>
                </div>
                <Cards data={search(data)}/>
            </div>
        </>
    )
}

export default Topics