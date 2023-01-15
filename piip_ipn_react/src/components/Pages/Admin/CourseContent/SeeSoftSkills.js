import { useState, useEffect } from 'react'
import Cards from './Cards'
import { NewActivity } from '../../../../externalClasses'
import './SeeTopics.css'

function SeeSoftSkills ({ userData, addActivity, activityIndex, sectionId, userId }) {
  const [data, setData] = useState([])

  const getSoftSkillsTopics = async () => {
    let route = `/softSkillsTopics?sectionId=${sectionId}`
    if (userId !== undefined && userId !== null) {
      route = `/softSkillsTopics?user_id=${userId}`
    }
    const response = await fetch(route, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + userData.token,
        'User-Type': userData.role,
        'User-Id': userData.user_id,
      }
    })
    const data = await response.json()
    setData(data)
  }

  useEffect(() => {
    getSoftSkillsTopics()
  }, [])

  const [query, setQuery] = useState('')

  function search (rows) {
    return rows.filter(
      row => row.title.toLowerCase().indexOf(query.toLowerCase()) > -1
    )
  }
  const addSoftSkillTopic = (topic) => {
    const newAct = NewActivity(topic.title, topic.description, 4, topic.id)
    addActivity(newAct, activityIndex, sectionId)
  }

  return (
        <>
            <div className='see-topics-container'>
                <div className='search_wrap'>
                    <div className='search_box'>
                        <div className='btn btn-common'>
                            <i className='fas fa-search'></i>
                        </div>
                        <input type="text" className='input' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search ...'></input>
                    </div>
                </div>
                <Cards data={search(data)} execute={addSoftSkillTopic}/>
            </div>
        </>
  )
}

export default SeeSoftSkills
