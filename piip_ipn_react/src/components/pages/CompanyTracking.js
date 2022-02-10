import React, { useState } from 'react'
import Datatable from '../Datatable'
import '../../App.css'

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
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}></input>
            <Datatable data={search(data)}/>
        </>
    )
}

export default CompanyTracking