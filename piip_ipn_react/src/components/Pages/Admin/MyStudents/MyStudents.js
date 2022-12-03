import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Metrics from './Metrics'
import './MyStudents.css'
import MyStudentsPage from './MyStudentsPage'
import PendingStudentsPage from './PendingStudentsPage'

function MyStudents ({ userData }) {
  const [userId, setUserId] = useState(-1)
  const [option, setOption] = useState('mystudents')
  if (userId !== -1) {
    const url = '/update-course/' + userId
    return (
            <Navigate to={url}/>
    )
  }
  return (
        <div className='my-students-container'>
            <div className='my-students'>
                <nav className='my-students-navbar'>
                    <div className='my-students-navbar-container'>
                        <ul className="my-students-nav-menu">
                            <li className='my-students-nav-item' onClick={() => setOption('mystudents')}>
                                My Students
                            </li>
                            <li className='my-students-nav-item'>
                                |
                            </li>
                            <li className='my-students-nav-item' onClick={() => setOption('pendingstudents')}>
                                Pending Students
                            </li>
                            <li className='my-students-nav-item'>
                                |
                            </li>
                            <li className='my-students-nav-item' onClick={() => setOption('metrics')}>
                                Metrics
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className='my-students-content'>
                    {
                        option === 'mystudents'
                          ? <MyStudentsPage userData={userData} setUserId={setUserId}/>
                          : option === 'pendingstudents'
                            ? <PendingStudentsPage userData={userData}/>
                            : <Metrics userData={userData}/>
                    }
                </div>
            </div>
        </div>
  )
}
export default MyStudents
