import React, { useState } from 'react'
import Datatable from '../Datatable'
import './CompanyTracking.css'

function CompanyTracking() {
    const [data, setData] = useState([
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p2", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
    ]);
    const [query, setQuery] = useState("");

    function search(rows){
        return rows.filter(
            row => row.Company.toLowerCase().indexOf(query.toLowerCase()) > -1
        )
    }

    return (
        <>
            <div className='main-container'>
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

export default CompanyTracking