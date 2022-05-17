import { IconContext } from 'react-icons';
import { FiCheck, FiPlus, FiSlash, FiEdit3 } from 'react-icons/fi';
import { TiDelete } from 'react-icons/ti'
import React, { useState } from 'react'
import { useEffect } from 'react/cjs/react.development'
import Datatable from '../../../Datatable/Datatable'
import './CompanyTracking.css'

const baseURL = "http://127.0.0.1:5000"


function CompanyTracking({userData}) {
    const [newActivityIndex, setNewActivityIndex] = useState(-1)
    const [newActivitySectionId, setNewActivitySectionId] = useState(-1)
    const user_id = userData.user_id;
    const [description, setDescription] = useState("")
    const [clicked, setClicked] = useState(-1);
    const [companies, setCompanies] = useState([
        {
            "applicationURL": "https://www.metacareers.com/",
            "id": 1,
            "userId": 1,
            "statusId": 1,
            "interviewDate": null,
            "companyId": 1,
            "trackingLinks": [
                {
                    "description": "Meta openings",
                    "id": 1,
                    "url": "https://www.metacareers.com/jobs",
                    "companyTrackingId": 1,
                    "is_active": true
                },
                {
                    "description": "hla",
                    "id": 2,
                    "url": "here",
                    "companyTrackingId": 1,
                    "is_active": true
                }
            ],
            "companyName": "Facebook"
        }])
        const toggle = index => {
            if (clicked === index) {
                //if clicked question is already active, then close it 2
                return setClicked(-1);
            }   
            setClicked(index);
        };
    
    const prepareNewSection = (index, templateSectionId) => {
        setNewActivityIndex(index)
        setNewActivitySectionId(templateSectionId)
    }
    
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


    const deleteCompanyTracking = async (indexCompany, company_tracking_id) => {
        const response = await fetch(baseURL + `/user/tracking/${company_tracking_id}`, {
            method: "DELETE",
        })
        console.log(response);
        getCompanies();
    }

    const deleteCompanyTrackingLink = async(indexLink, company_tracking_link_id) => {
        const response = await fetch(baseURL + `/user/tracking/link/${company_tracking_link_id}`, {
            method: "DELETE",
        })
        console.log(response);
        getCompanies();
    }

    const [query, setQuery] = useState("");

    function search(rows){
        return rows.filter(
            row => row.companyName.toLowerCase().indexOf(query.toLowerCase()) > -1
        )
    }

    return(
        <>
            <div className='course-content-container'>
                {companies !== undefined && (<div className='course'> 
                    <h1 className='course-title'>{"Here you can keep track of the companies that you're interested in applying to."}</h1>
                    <IconContext.Provider value={{ color: 'red', size: '25px' }}>
                        <div className='AccordionSection'>
                            <div className='Container'>
                                {companies.map((company, indexCompany) => {
                                    return (
                                    <>
                                        <div className='Wrap' key={indexCompany}>
                                            <h1 onClick={() => toggle(indexCompany)}>{company.companyName}</h1>
                                            <span><TiDelete onClick={() => deleteCompanyTracking(indexCompany, company.id)}/></span>
                                        </div>
                                        <div className='activities-container'>
                                        {
                                            clicked === indexCompany 
                                                ? 
                                                (
                                                    company.trackingLinks.map((link,indexLink) => {
                                                        return (
                                                            <>
                                                                <div className='Dropdown' key={indexLink}>
                                                                    <p><b>{link.description}</b>: {link.url}</p>
                                                                    <span><TiDelete onClick={() => deleteCompanyTrackingLink(indexLink, link.id)}/></span>
                                                                </div>                                                                
                                                            </>
                                                        )
                                                    })
                                                ) 
                                                : null
                                        }
                                        {
                                            clicked === indexCompany
                                            ?
                                            (
                                                <div className='AddNewActivity'>
                                                    <input type='text' placeholder='Section Name' className='input' value={description} onChange={(e) => setDescription(e.target.value)}/>
                                                    <span>{<FiPlus onClick={() => addCompanyTrackingLink()}/>}</span>
                                                    <span>{<FiPlus onClick={() => prepareNewSection(indexCompany, company.id) }/>}</span>
                                                </div>
                                            )
                                            :null
                                        }
                                        </div>
                                    </>
                                    );
                                })}
                                <div className='AddNewSection'>
                                    <h2>Add a new company to track: </h2>
                                    <span>{<FiPlus />}</span>
                                </div>
                            </div>
                        </div>
                    </IconContext.Provider>
                </div>)}
            </div>
        </>
    )

    /*
    return (
        <>
        </>
        )
        */
}

export default CompanyTracking