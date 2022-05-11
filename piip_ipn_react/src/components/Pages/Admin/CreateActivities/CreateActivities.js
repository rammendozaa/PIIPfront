import AddTopic from "../AddTopic/AddTopic"
import CreateQuiz from "../CourseContent/CreateQuiz"
import RefreshProblems from "../CourseContent/RefreshProblems"
import AddSoftSkillQuestion from "../CourseContent/AddSoftSkillQuestion"
import { useState, useEffect, useRef } from "react";

const baseURL = "http://127.0.0.1:5000"


function CreateActivities({userData}) {
    const [option, setOption] = useState("")
    const renderOption = () => {
         if (option === "problem") {
            return <RefreshProblems/>
         } else if (option === "topic") {
            return <AddTopic/>
         } else if (option === "softskillquestion") {
            return <AddSoftSkillQuestion userData={userData}/>
         } else if (option === "quest") {
            return <CreateQuiz/>
         }
    }
    return (
      <div className="create-activities">
         <div className='options-container'>
            <p>Please select activity type:</p>
               <div className='options'>
                  <input type="radio" id="problem" name="activityType" value="problem" onChange={(e) => setOption(e.target.value)}/>
                  <label for="problem">Problem</label>

                  <input type="radio" id="topic" name="activityType" value="topic" onChange={(e) => setOption(e.target.value)}/>
                  <label for="topic">Topic</label>

                  <input type="radio" id="softskillquestion" name="activityType" value="softskillquestion" onChange={(e) => setOption(e.target.value)}/>
                  <label for="softskillquestion">Soft Skill Question</label>

                  <input type="radio" id="quest" name="activityType" value="quest" onChange={(e) => setOption(e.target.value)}/>
                  <label for="quest">Questionnaire</label>
               </div>
               <div className='create-activity'>
                  {renderOption()} 
               </div>
            </div>
      </div>
    )
}

export default CreateActivities