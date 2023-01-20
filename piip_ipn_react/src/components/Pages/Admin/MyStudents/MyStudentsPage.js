import { useState, useEffect } from 'react'
import DatatableMyStudents from '../../../Datatable/DatatableMyStudents'
import './MyStudents.css'
import RequestError from '../../../RequestError'


function MyStudentsPage ({ userData, setUserId }) {
  const [myStudents, setMyStudents] = useState([])
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
  const getMyStudents = async () => {
    const response = await fetch('/myStudents', {
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
    setMyStudents(data)
  }
  useEffect(() => {
    getMyStudents()
  }, [])
  useEffect(() => {
    const timer = setInterval(getMyStudents, 2000)
    return () => clearInterval(timer)
  }, [])
  const goToUpdateCourse = (user) => {
    setUserId(user.id)
  }
  if (errorCode !== null) {
    return <RequestError errorCode={errorCode}/>
  }

  return (
        <>
            <h1>My Students</h1>
            <DatatableMyStudents data={myStudents} goToUpdateCourse={goToUpdateCourse} schools={schools}/>
        </>
  )
}
export default MyStudentsPage
