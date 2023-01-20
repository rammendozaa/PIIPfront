import { useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import './Templates.css'
import { IconContext } from 'react-icons'
import { FiPlus } from 'react-icons/fi'
import { TiDelete } from 'react-icons/ti'
import Popup from '../../Admin/CourseContent/Popup'
import { useParams } from 'react-router-dom'
import RequestError from '../../../RequestError'

const baseURL = 'http://127.0.0.1:5000'
const activityIdToName = {
  1: 'Problem',
  2: 'Topic',
  3: 'Soft Skill Question',
  4: 'Topic',
  5: 'Interview',
  6: 'Questionnaire'
}

function Templates ({ userData }) {
  const { template_id } = useParams()
  const [data, setData] = useState({
    id: 11,
    description: 'o section',
    name: 'no section',
    sections: [],
    position: null
  })
  const [errorCode, setErrorCode] = useState(null)

  const [newActivityIndex, setNewActivityIndex] = useState(-1)
  const [newActivitySectionId, setNewActivitySectionId] = useState(-1)
  const [clicked, setClicked] = useState(-1)
  const [newSectionName, setNewSectionName] = useState('')
  const [buttonPopup, setButtonPopup] = useState(false)
  const toggle = index => {
    if (clicked === index) {
      // if clicked question is already active, then close it 2
      return setClicked(-1)
    }
    setClicked(index)
  }

  const addNewActivity = async (activity, index, templateSectionId) => {
    const current = data
    let response = null
    response = await fetch(`/activity/section/${templateSectionId}/activity/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token,
        'User-Type': userData.role,
        'User-Id': userData.user_id,
      },
      body: JSON.stringify({
        name: activity.name,
        description: activity.description,
        position: (current.sections[index].activities.length) + 1,
        activityType: activity.typeId,
        externalReference: activity.reference
      })
    })
    if (response.status !== 200) {
      setErrorCode(response.status)
      return
    }
    const newActivityResponse = await response.json()
    current.sections[index].activities = [
      ...current.sections[index].activities,
      newActivityResponse
    ]
    setData(prevState => ({
      ...prevState,
      current
    }))
  }

  const AddNewSection = async () => {
    if (!newSectionName) {
      alert("Section name can't be empty")
      return
    }
    const current = data
    let response = null
    response = await fetch(`/template/${template_id}/section/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token,
        'User-Type': userData.role,
        'User-Id': userData.user_id,
      },
      body: JSON.stringify({
        name: newSectionName,
        description: newSectionName,
        position: (current.sections.length) + 1
      })
    })
    if (response.status !== 200) {
      setErrorCode(response.status)
      return
    }
    const newSectionResponse = await response.json()
    current.sections = [
      ...current.sections,
      newSectionResponse
    ]
    setData(prevState => ({
      ...prevState,
      current
    }))
    setNewSectionName('')
  }

  const deleteSection = async (index, sectionId) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      const current = data
      const response = await fetch(`/template/section/${sectionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + userData.token,
          'User-Type': userData.role,
          'User-Id': userData.user_id,
        }
      })
      if (response.status !== 200) {
        setErrorCode(response.status)
        return
      }
      current.sections = current.sections.filter((item, idx) => idx != index)
      setData(prevState => ({
        ...prevState,
        current
      }))
    }
  }

  const deleteActivity = async (indexSection, indexActivity, sectionActivityId) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      const current = data
      const response = await fetch(`/template/section/activity/${sectionActivityId}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + userData.token,
          'User-Type': userData.role,
          'User-Id': userData.user_id,
        }
      })
      if (response.status !== 200) {
        setErrorCode(response.status)
        return
      }
      current.sections[indexSection].activities = current.sections[indexSection].activities.filter((item, idx) => idx != indexActivity)
      setData(prevState => ({
        ...prevState,
        current
      }))
    }
  }

  const prepareNewSection = (index, templateSectionId) => {
    setNewActivityIndex(index)
    setNewActivitySectionId(templateSectionId)
    setButtonPopup(true)
  }
  useEffect(() => {
    fetch(`/template?template_id=${template_id}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + userData.token,
        'User-Type': userData.role,
        'User-Id': userData.user_id,
      }
    })
    .then(async res => {
      if (res.status !== 200) {
        const error_status = res.status
        return Promise.reject(error_status);
      }  
      return res.json()
    })
    .then(data => {
      setData(data)
    })
    .catch(error_status => {
      setErrorCode(error_status)
      return
    })
  }, [])
  if (errorCode !== null) {
    return <RequestError errorCode={errorCode}/>
  }
  return (
        <>
            <div className='template-content-container'>
                <div className="template-content">
                    {data !== undefined && (<div className='template'>
                        <h1 className='template-title'>{data.name}</h1>
                        <IconContext.Provider value={{ color: 'red', size: '25px' }}>
                            <div className='template-accordionSection'>
                                <div className='template-container'>
                                    {data.sections.map((section, indexSection) => {
                                      return (
                                        <>
                                            <div className='template-wrap' key={indexSection}>
                                                <h1 onClick={() => toggle(indexSection)}>{section.name}</h1>
                                                {userData.role === 'super' && <span><TiDelete onClick={() => deleteSection(indexSection, section.id)}/></span>}
                                            </div>
                                            <div className='template-activities-container'>
                                            {
                                                clicked === indexSection
                                                  ? (
                                                      section.activities.map((activity, indexActivity) => {
                                                        return (
                                                                <>
                                                                    <div className='template-dropdown' key={indexActivity}>
                                                                        <p><b>{activityIdToName[activity.activityType]}</b>: {activity.name}</p>
                                                                        {userData.role === 'super' && <span><TiDelete onClick={() => deleteActivity(indexSection, indexActivity, activity.id)}/></span>}
                                                                    </div>
                                                                </>
                                                        )
                                                      })
                                                    )
                                                  : null
                                            }
                                            {
                                                clicked === indexSection && userData.role === 'super'
                                                  ? (
                                                    <div className='template-addNewActivity'>
                                                        <span>{<FiPlus onClick={() => prepareNewSection(indexSection, section.id) }/>}</span>
                                                    </div>
                                                    )
                                                  : null
                                            }
                                            </div>
                                        </>
                                      )
                                    })}
                                    {userData.role === 'super' && <div className='template-addNewSection'>
                                        <input type='text' placeholder='Section Name' className='template-input' value={newSectionName} onChange={(e) => setNewSectionName(e.target.value)}/>
                                        <span>{<FiPlus onClick={() => AddNewSection()}/>}</span>
                                    </div>}
                                </div>
                            </div>
                        </IconContext.Provider>
                    </div>)}
                    <Popup showInterview={false} trigger={buttonPopup} setButtonPopup={setButtonPopup} userData={userData} functionToAddActivity={addNewActivity} activityIndex={newActivityIndex} sectionId={newActivitySectionId}/>
                </div>
            </div>
        </>
  )
}

export default Templates
