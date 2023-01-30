import './AddQuiz.css'
import { NewActivity } from '../../../../../src/externalClasses'
import { useState, useEffect } from 'react'
import Cards from './Cards'
import RequestError from '../../../RequestError'

const baseURL = 'http://127.0.0.1:1234'

function AddQuiz ({ userData, addActivity, activityIndex, sectionId, userId }) {
  const [quizzes, setQuizzes] = useState([])
  const [errorCode, setErrorCode] = useState(null)

  const fetchQuestionnaires = async () => {
    let route = `/questionnaire?sectionId=${sectionId}`
    if (userId !== undefined && userId !== null) {
      route = `/questionnaire?user_id=${userId}`
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
    const data = await response.json();
    setQuizzes(data);
  }
  useEffect(() => {
    fetchQuestionnaires()
  }, [])

  function search (rows) {
    return rows.filter(
      row => row.title.toLowerCase().indexOf(query.toLowerCase()) > -1
    )
  }

  const [query, setQuery] = useState('')

  const addQuestionnaire = (quiz, index) => {
    const newAct = NewActivity(quiz.title, quiz.description, 6, quiz.id)
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
                <Cards data={search(quizzes)} execute={addQuestionnaire}/>
            </div>
        </>
  )
  /*
    return (
        <div className='div-table'>
            <table className='content-table'>
                <thead>
                    <tr>
                    <th>Available questionnaires</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        quizzes.map((quiz, index) =>
                            <tr>
                                <td className='tdd'>
                                {quiz['title']}
                                <IconContext.Provider value={{ color: "#009879", size: '25px' }}>
                                    {
                                    <FiPlus onClick={() => addQuestionnaire(quiz, index)}/>
                                    }
                                </IconContext.Provider>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
    */
}

export default AddQuiz
