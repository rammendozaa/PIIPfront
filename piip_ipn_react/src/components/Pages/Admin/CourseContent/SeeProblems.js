import { FiPlus, FiMinus } from 'react-icons/fi';
import React, { useEffect, useState } from 'react'
import './SeeProblem.css'
import ProblemsTable from './ProblemsTable';
import { NewActivity } from './CourseContent'


function SeeProblems({userData, addActivity, activityIndex, sectionId}) {
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

    const addNewActivities = () => {
        console.log("add new activity")
        for (var i = 0 ; i < addedProblems.length ; i++) {
            const newAct = NewActivity(addedProblems[i].title, addedProblems[i].description, 1, addedProblems[i].id);
            console.log("inside add new activit " + activityIndex + " sect " + sectionId)
            addActivity(newAct, activityIndex, sectionId);
        }
        setAddedProblems([])
    }
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
                <div className='AddNewActivity'>
                    <span>{<FiPlus onClick={() => addNewActivities() }/>}</span>
                </div>
            </div>
        </>
    )
}
export default SeeProblems