import React, { useEffect, useState } from 'react'
import './Problems.css'
import { Navigate } from 'react-router-dom'
import ProblemsTable from './ProblemsTable'
import RequestError from '../../RequestError'

function Problems ({ userData }) {
  const [data, setData] = useState([])
  const [query, setQuery] = useState('')
  const [problemId, setProblemId] = useState(-1)
  const [errorCode, setErrorCode] = useState(null)

  function search (rows) {
    return rows.filter(
      row => row.title.toLowerCase().indexOf(query.toLowerCase()) > -1
    )
  }

  useEffect(() => {
    fetch('/problems', {
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

  const goToProblem = (problem) => {
    setProblemId(problem.id)
  }

  if (problemId !== -1) {
    const url = '/problem/' + problemId
    return (
            <Navigate to={url}/>
    )
  }
  if (errorCode !== null) {
    return <RequestError errorCode={errorCode}/>
  }

  return (
        <>
            <div className='problems-container'>
                <div className='search_wrap'>
                    <div className='search_box'>
                        <div className='btn btn-common'>
                            <i className='fas fa-search'></i>
                        </div>
                        <input type="text" className='input' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search ...'></input>
                    </div>
                </div>
                <ProblemsTable data={search(data)} goToProblem={goToProblem}/>
            </div>
        </>
  )
}
export default Problems
