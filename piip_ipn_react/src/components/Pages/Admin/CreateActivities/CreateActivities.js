import AddTopic from "../AddTopic/AddTopic"
import CreateQuiz from "../CourseContent/CreateQuiz"
import RefreshProblems from "../CourseContent/RefreshProblems"
import AddSoftSkillQuestion from "../CourseContent/AddSoftSkillQuestion"
import { useState } from "react";
import './CreateActivities.css'

function CreateActivities({userData}) {
    const [option, setOption] = useState("")
    return (
       <div className="create-activities-container">
         <div className="create-activities">
            <div className="d-flex-topic justify-content-center-topic">
               <div className='options-container'>
                        <div className="d-flex-create-activities justify-content-center-topic">
                        <button button type="button" className="btn-create-activities" 
                           onClick={() => setOption("problem")}>
                           Refresh server problems
                        </button>
                        <button type="button" className="btn-create-activities" 
                           onClick={() => setOption("topic")}>
                           Add a new topic
                        </button>
                        <button type="button" className="btn-create-activities" 
                           onClick={() => setOption("softskillquestion")}>
                           Add a new question
                        </button>
                        <button type="button" className="btn-create-activities" 
                           onClick={() => setOption("quest")}>
                           Create quiz
                        </button>
                     </div>
               </div>
            </div>
            <div className='create-activity'>
               {option === "problem" ? <RefreshProblems/>: 
               option === "topic" ? <AddTopic/> :
               option === "softskillquestion" ? <AddSoftSkillQuestion userData={userData}/> :
               option === "quest" ? <CreateQuiz/> : <><br/><br/><br/><h2>Choose an action from the options above</h2></>}
            </div>
         </div>
      </div>
    )
}

export default CreateActivities