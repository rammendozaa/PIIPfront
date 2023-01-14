import AddTopic from '../AddTopic/AddTopic'
import CreateQuiz from '../CourseContent/CreateQuiz'
import RefreshProblems from '../CourseContent/RefreshProblems'
import AddSoftSkillQuestion from '../CourseContent/AddSoftSkillQuestion'
import { useState } from 'react'
import './CreateActivities.css'

function CreateActivities ({ userData }) {
  const [option, setOption] = useState('problem')
  return (
      <div className="create-activities-container">
         <div className="create-activities">
            <nav className='create-activities-navbar'>
               <div className='create-activities-navbar-container'>
                  <ul className="create-activities-nav-menu">
                     <li className='create-activities-nav-item' onClick={() => setOption('problem')}>
                         Refresh server problems
                     </li>
                     <li className='create-activities-nav-item'>
                        |
                     </li>
                     <li className='create-activities-nav-item' onClick={() => setOption('topic')}>
                        Add a new topic
                     </li>
                     <li className='create-activities-nav-item'>
                        |
                     </li>
                     <li className='create-activities-nav-item' onClick={() => setOption('softskillquestion')}>
                        Add a new question
                     </li>
                     <li className='create-activities-nav-item'>
                        |
                     </li>
                     <li className='create-activities-nav-item' onClick={() => setOption('quest')}>
                        Create quiz
                     </li>
                  </ul>
               </div>
            </nav>
         <div className='create-activity'>
            {
               option === 'problem'
                 ? <RefreshProblems userData={userData}/>
                 : option === 'topic'
                   ? <AddTopic userData={userData}/>
                   : option === 'softskillquestion'
                     ? <AddSoftSkillQuestion userData={userData}/>
                     : option === 'quest' ? <CreateQuiz userData={userData}/> : <><br/><br/><br/><h2>Choose an action from the options above</h2></>
            }
         </div>
      </div>
   </div>
  )
}

export default CreateActivities
