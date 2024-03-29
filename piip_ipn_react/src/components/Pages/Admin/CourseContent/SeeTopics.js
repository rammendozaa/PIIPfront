import { useState, useEffect } from 'react'
import { NewActivity } from '../../../../externalClasses'
import Cards from './Cards'
import './SeeTopics.css'
import RequestError from '../../../RequestError'

function SeeTopics ({ userData, addActivity, activityIndex, sectionId, userId }) {
  const [data, setData] = useState([])
  const [errorCode, setErrorCode] = useState(null)

  const getProgrammingTopics = async () => {
    let route = `/algorithmTopics?sectionId=${sectionId}`
    if (userId !== undefined && userId !== null) {
      route = `/algorithmTopics?user_id=${userId}`
    }
    const response = await fetch(route, {
      method: 'GET',
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
    const data = await response.json()
    setData(data)
  }

  useEffect(() => {
    getProgrammingTopics()
  }, [])

  const [query, setQuery] = useState('')

  function search (rows) {
    return rows.filter(
      row => row.title.toLowerCase().indexOf(query.toLowerCase()) > -1
    )
  }

  const addProgrammingTopic = (topic) => {
    const newAct = NewActivity(topic.title, topic.description, 2, topic.id)
    addActivity(newAct, activityIndex, sectionId)
  }
  if (errorCode !== null) {
    return <RequestError errorCode={errorCode}/>
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
                <Cards data={search(data)} execute={addProgrammingTopic}/>
            </div>
        </>
  )
}

export default SeeTopics
