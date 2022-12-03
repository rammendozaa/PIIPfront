import { useState, useEffect } from 'react'
import DatatablePendingStudents from '../../../Datatable/DatatablePendingStudents'
import './MyStudents.css'

function PendingStudentsPage ({ userData }) {
  const [pendingStudents, setPendingStudents] = useState([])
  const [schools, setSchools] = useState([])
  useEffect(() => {
    fetch('/schools', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        setSchools(data)
      })
  }, [])
  const getPendingStudents = async () => {
    const response = await fetch('/pendingStudents', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + userData.token
      }
    })
    const data = await response.json()
    setPendingStudents(data)
  }
  useEffect(() => {
    getPendingStudents()
  }, [])
  useEffect(() => {
    const timer = setInterval(getPendingStudents, 2000)
    return () => clearInterval(timer)
  }, [])
  const assignStudent = (row) => {
    const user_id = pendingStudents[row].id
    const formData = new FormData()
    formData.append('user_id', user_id)
    fetch('/assign-student', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userData.token
      },
      body: formData
    })
      .then(res => res.json())
  }
  return (
        <>
            <h1>Pending Students</h1>
            <DatatablePendingStudents data={pendingStudents} schools={schools} assignStudent={assignStudent}/>
        </>
  )
}
export default PendingStudentsPage
