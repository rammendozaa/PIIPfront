import { useState, useEffect } from 'react'
import DatatablePendingStudents from '../../../Datatable/DatatablePendingStudents'
import './MyStudents.css'
import RequestError from '../../../RequestError'

function PendingStudentsPage ({ userData }) {
  const [pendingStudents, setPendingStudents] = useState([])
  const [schools, setSchools] = useState([])
  const [errorCode, setErrorCode] = useState(null)

  useEffect(() => {
    fetch('/schools', {
      method: 'GET'
    })
    .then(async res => {
      if (res.status !== 200) {
        const error_status = res.status
        return Promise.reject(error_status);
      }  
      return res.json()
    })
    .then(data => {
      setSchools(data)
    })
    .catch(error_status => {
      setErrorCode(error_status)
      return
    })
  }, [])
  const getPendingStudents = async () => {
    const response = await fetch('/pendingStudents', {
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
    setPendingStudents(data)
  }
  useEffect(() => {
    getPendingStudents()
  }, [])
  useEffect(() => {
    const timer = setInterval(getPendingStudents, 20000)
    return () => clearInterval(timer)
  }, [])
  const assignStudent = async (row) => {
    const user_id = pendingStudents[row].id
    const formData = new FormData()
    formData.append('user_id', user_id)
    const response = await fetch('/assign-student', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userData.token,
        'User-Type': userData.role,
        'User-Id': userData.user_id,
      },
      body: formData
    })
    if (response.status !== 200) {
      setErrorCode(response.status)
      return
    }
  }

  if (errorCode !== null) {
    return <RequestError errorCode={errorCode}/>
  }
  return (
        <>
            <h1>Pending Students</h1>
            <DatatablePendingStudents data={pendingStudents} schools={schools} assignStudent={assignStudent}/>
        </>
  )
}
export default PendingStudentsPage
