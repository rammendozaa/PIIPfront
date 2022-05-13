import React, { useState } from 'react'
import { useEffect } from 'react/cjs/react.development'
import Datatable from '../../../Datatable/Datatable'
import './CompanyTracking.css'

const baseURL = "http://127.0.0.1:5000"


function CompanyTracking({userData}) {
    const user_id = userData.user_id
    const [companies, setCompanies] = useState([])


    const getCompanies = async () => {
        fetch(baseURL + `/user/${user_id}/tracking`, {
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            setCompanies(data);
        });
    }
    useEffect(() => {
        getCompanies();
    }, [])

    const addCompanyTracking = async (company_id, application_url, interview_date) => {
        const response = await fetch(baseURL + `/user/${user_id}/tracking`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "companyId": company_id,
                "applicationURL": application_url,
                "interviewDate": interview_date,
            }),
        })
        console.log(response);
        getCompanies();
    }

    const addCompanyTrackingLink = async (company_tracking_id, description, url) => {
        const response = await fetch(baseURL + `/user/tracking/${company_tracking_id}`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "description": description,
                "url": url,
            }),
        })
        console.log(response);
        getCompanies();
    }

    const updateCompanyTracking = async(company_tracking_id, statusId, applicationURL, interviewDate) => {
        const response = await fetch(baseURL + `/user/tracking/${company_tracking_id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "statusId": statusId,
                "applicationURL": applicationURL,
                "interviewDate": interviewDate,
            }),
        })
        console.log(response);
        getCompanies();
    }


    const updateCompanyTrackingLink = async(company_tracking_link_id, description, url) => {
        const response = await fetch(baseURL + `/user/tracking/link/${company_tracking_link_id}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "description": description,
                "url": url,
            }),
        })
        console.log(response);
        getCompanies();
    }


    const deleteCompanyTracking = async (company_tracking_id) => {
        const response = await fetch(baseURL + `/user/tracking/${company_tracking_id}`, {
            method: "DELETE",
        })
        console.log(response);
        getCompanies();
    }

    const deleteCompanyTrackingLink = async(company_tracking_link_id) => {
        const response = await fetch(baseURL + `/user/tracking/link/${company_tracking_link_id}`, {
            method: "DELETE",
        })
        console.log(response);
        getCompanies();
    }

    const [data, setData] = useState([
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p2", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p2", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p2", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p2", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p2", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p2", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p2", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p2", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p1", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
        {"Company" : "p2", "Link" : "www.google.com", "next-interview" : "calendar", "status" : "solved"},
    ]);
    const [query, setQuery] = useState("");

    function search(rows){
        return rows.filter(
            row => row.companyName.toLowerCase().indexOf(query.toLowerCase()) > -1
        )
    }
/*
            <div className='company-container'>
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

*/

    return (
        <>
        </>
    )
}

export default CompanyTracking