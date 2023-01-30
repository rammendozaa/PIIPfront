import { useState } from 'react'
import './RefreshProblems.css'
import RequestError from '../../../RequestError'

function RefreshProblems ({ userData }) {
  const [waitingMessage, setWaitingMessage] = useState('Click the button below to get the latest problems.')
  const [errorCode, setErrorCode] = useState(null)
  const insertProblemsToDatabase = async () => {
    setWaitingMessage('Downloading...')
    const response = await fetch('/insertProblemsToDB', {
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
    setWaitingMessage('Download complete!')
  }

  if (errorCode !== null) {
    return <RequestError errorCode={errorCode}/>
  }

  return (
        <>
            <h1>{waitingMessage}</h1>
            <button className="btn-refresh-problems" onClick={insertProblemsToDatabase}>Refresh Problems</button>
        </>
  )
}

export default RefreshProblems
