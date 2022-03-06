import React, { useEffect, useState } from 'react'
import Datatable from '../Datatable'
import './Problems.css'

function Problems({token}) {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");

    function search(rows){
        return rows.filter(
            row => row.title.toLowerCase().indexOf(query.toLowerCase()) > -1
        )
    }

    useEffect(() => {
        fetch('/problems',{
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + token
            },
        })
        .then(res => res.json())
        .then(data => {
            setData(data)
        });
    });
    return (
        <>
            <div className='problems-container'>
                <div className='search_wrap'>
                    <div className='search_box'>
                        <div className='btn btn-common'>
                            <i className='fas fa-search'></i> 
                        </div>
                        <input type="text" className='input' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search ...'></input>
                    </div>
                </div>
                <Datatable data={search(data)}/>
            </div>
        </>
    )
}
export default Problems