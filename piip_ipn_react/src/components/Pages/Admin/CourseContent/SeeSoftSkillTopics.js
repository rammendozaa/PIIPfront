import { useEffect, useState } from 'react'
import './SeeSoftSkillTopics.css'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
import { FaSave } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import { FiPlus, FiMinus } from 'react-icons/fi'
import { TiDelete } from 'react-icons/ti'
import { NewActivity } from '../../../../../src/externalClasses'
import RequestError from '../../../RequestError'
const baseURL = 'http://127.0.0.1:1234'

function SeeSoftSkillTopics ({ userData, addActivity, activityIndex, sectionId }) {
  const [topics, setTopics] = useState([])
  const [errorCode, setErrorCode] = useState(null)

  const fetchSoftSkillTopics = async () => {
    const response = await fetch('/softSkillsTopics', {
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
    setTopics(data)
  }
  useEffect(() => {
    fetchSoftSkillTopics()
  }, [])

  const addSoftSkillTopic = (topic, index) => {
    const newAct = NewActivity(topic.title, topic.description, 4, topic.id)
    addActivity(newAct, activityIndex, sectionId)
  }
  if (errorCode !== null) {
    return <RequestError errorCode={errorCode}/>
  }

  return (
        <div className='div-table'>
            <table className='content-table'>
                <thead>
                    <tr>
                    <th>Soft Skills Topics:</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        topics.map((topic, index) =>
                            <tr>
                                <td className='tdd'>
                                {topic.title}
                                <IconContext.Provider value={{ color: '#009879', size: '25px' }}>
                                    {
                                    <FiPlus onClick={() => addSoftSkillTopic(topic, index)}/>
                                    }
                                </IconContext.Provider>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
  )
}

export default SeeSoftSkillTopics
