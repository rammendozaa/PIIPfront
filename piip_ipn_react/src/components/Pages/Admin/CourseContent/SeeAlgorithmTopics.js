import { useEffect, useState } from 'react'
import './SeeAlgorithmTopics.css'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
import { FaSave } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import { FiPlus, FiMinus } from 'react-icons/fi'
import { TiDelete } from 'react-icons/ti'
import RequestError from '../../../RequestError'
import { NewActivity } from '../../../../../src/externalClasses'
const baseURL = 'http://127.0.0.1:5000'

function SeeAlgorithmTopics ({ userData, addActivity, activityIndex, sectionId }) {
  const [topics, setTopics] = useState([])
  const [errorCode, setErrorCode] = useState(null)

  const fetchAlgorithmTopics = async () => {
    const response = await fetch('/algorithmTopics', {
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
    fetchAlgorithmTopics()
  }, [])

  const addAlgorithmTopic = (topic, index) => {
    const newAct = NewActivity(topic.title, topic.description, 2, topic.id)
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
                    <th>Algorithm Topics:</th>
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
                                    <FiPlus onClick={() => addAlgorithmTopic(topic, index)}/>
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

export default SeeAlgorithmTopics
