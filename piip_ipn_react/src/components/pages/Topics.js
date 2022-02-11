import {useState} from 'react'
import '../../App.css'
import Cards from '../Cards'

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
            "path" : "/graphs"
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
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}></input>
            <Cards data={search(data)}/>
        </>
    )
}

export default Topics