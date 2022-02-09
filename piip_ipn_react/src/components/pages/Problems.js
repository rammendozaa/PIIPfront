import React, { useState } from 'react'
import Datatable from '../Datatable'
import '../../App.css'

function Problems() {
    const [data, setData] = useState([
        {"title" : "p1", "related_topics" : "dp, greedy", "difficulty" : "easy", "status" : "solved"},
        {"title" : "p1", "related_topics" : "dp, greedy", "difficulty" : "easy", "status" : "solved"},
        {"title" : "p1", "related_topics" : "dp, greedy", "difficulty" : "easy", "status" : "solved"},
        {"title" : "p2", "related_topics" : "dp, greedy", "difficulty" : "easy", "status" : "solved"},
    ]);
    const [query, setQuery] = useState("");

    function search(rows){
        return rows.filter(
            row => row.title.toLowerCase().indexOf(query.toLowerCase()) > -1
        )
    }

    return (
        <>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}></input>
            <Datatable data={search(data)}/>
        </>
    )
}

export default Problems