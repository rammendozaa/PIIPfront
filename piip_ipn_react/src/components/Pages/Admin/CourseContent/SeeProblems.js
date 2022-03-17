import React, { useEffect, useState } from 'react'
import './SeeProblem.css'
import ProblemsTable from './ProblemsTable';

function SeeProblems({userData}) {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");
    const [addedProblems, setAddedProblems] = useState([])
    function search(rows){
        return rows.filter(
            row => row.title.toLowerCase().indexOf(query.toLowerCase()) > -1
        )
    }
    const addProblem = (problem) => {
        setAddedProblems(prevState => 
            [...prevState,
                problem
            ]
        )  
    }
    const removeProblem = (problem) => {
        alert(problem['title'])
        var current = addedProblems.filter(item => item != problem)
        setAddedProblems(current)
    }
    useEffect(() => {
        console.log(userData.token)
        fetch('/problems',{
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + userData.token
            },
        })
        .then(res => res.json())
        .then(data => {
            setData(data)
        });
    },[]);
    return (
        <>
            <div className='see-problems-container'>
                <div className='search_wrap'>
                    <div className='search_box'>
                        <div className='btn btn-common'>
                            <i className='fas fa-search'></i> 
                        </div>
                        <input type="text" className='input' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search ...'></input>
                    </div>
                </div>
                <ProblemsTable data={search(data)} addProblem={addProblem} add={true}/>
                <ProblemsTable data={addedProblems} removeProblem={removeProblem} add={false}/>
            </div>
        </>
    )
}
export default SeeProblems