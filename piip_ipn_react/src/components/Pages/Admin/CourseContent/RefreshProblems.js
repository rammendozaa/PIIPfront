import { useState } from 'react'
import './RefreshProblems.css'
const baseURL = 'http://127.0.0.1:5000'

function RefreshProblems () {
  const [waitingMessage, setWaitingMessage] = useState('Click the button below to get the latest problems.')
  const insertProblemsToDatabase = async () => {
    setWaitingMessage('Downloading...')
    await fetch('/insertProblemsToDB', {
      method: 'GET'
    })
    setWaitingMessage('Download complete!')
  }

  return (
        <>
            <h1>{waitingMessage}</h1>
            <button className="btn-refresh-problems" onClick={insertProblemsToDatabase}>Refresh Problems</button>
        </>
  )
}

export default RefreshProblems
