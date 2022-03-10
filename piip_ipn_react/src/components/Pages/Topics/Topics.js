import {useState} from 'react'
import Cards from './Cards'
import './Topics.css'

function Topics() {
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

    const [query, setQuery] = useState("");

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
                <Cards data={search(data)}/>
            </div>
        </>
    )
}

export default Topics