import {useState} from 'react'
import AddTopic from '../AddTopic/AddTopic'
import './Popup.css'
import SeeProblems from './SeeProblems'
import SeeTopics from './SeeTopics.js'
import AddQuiz from './AddQuiz'
import SeeAlgorithmTopics from "./SeeAlgorithmTopics"
import SeeSoftSkillTopics from "./SeeSoftSkillTopics"
import SeeSoftSkillQuestions from './SeeSoftSkillQuestions'
import CreateInterview from './Interview'


function Popup(props) {
  const [option,setOption] = useState("")
  const renderOption = () => {
    if(option === "problem"){
      return (
        <SeeProblems 
        userData={props.userData}
        addActivity={props.functionToAddActivity}
        activityIndex={props.activityIndex}
        sectionId={props.sectionId}
        />
      )
    }else if(option === "topic"){
      return (
        <SeeTopics/>
      )
    }else if(option === "algotopic"){
      return (
        <SeeAlgorithmTopics
        userData={props.userData}
        addActivity={props.functionToAddActivity}
        activityIndex={props.activityIndex}
        sectionId={props.sectionId}
        />
      )
    }else if(option === "softskilltopic"){
      return (
        <SeeSoftSkillTopics
        userData={props.userData}
        addActivity={props.functionToAddActivity}
        activityIndex={props.activityIndex}
        sectionId={props.sectionId}
        />
      )
    }else if(option === "softskillquestion"){
      return (
        <SeeSoftSkillQuestions
        userData={props.userData}
        addActivity={props.functionToAddActivity}
        activityIndex={props.activityIndex}
        sectionId={props.sectionId}
        />
      )
    }else if(option === "quest"){
      return (
        <AddQuiz
          userData={props.userData}
          addActivity={props.functionToAddActivity}
          activityIndex={props.activityIndex}
          sectionId={props.sectionId}
        />
      )
    }else if(option === "interview"){
      return (
        <CreateInterview
        addActivity={props.functionToAddActivity}
        activityIndex={props.activityIndex}
        sectionId={props.sectionId}
        />
      )
    }else if(option === "note"){
      return (
        <AddTopic/>
      )
    }
  }
  return (props.trigger) ? (
  <div className='popup'>
    <div className='popup-inner'>
      <button className='close-btn' onClick={() => props.setButtonPopup(false)}>close</button>
      <div className='options-container'>
        <p>Please select activity type:</p>
        <div className='options'>
          <input type="radio" id="problem" name="activityType" value="problem" onChange={(e) => setOption(e.target.value)}/>
          <label for="problem">Problem</label>

          <input type="radio" id="topic" name="activityType" value="topic" onChange={(e) => setOption(e.target.value)}/>
          <label for="topic">Topic</label>

          <input type="radio" id="algotopic" name="activityType" value="algotopic" onChange={(e) => setOption(e.target.value)}/>
          <label for="algotopic">Algorithm Topic</label>

          <input type="radio" id="softskilltopic" name="activityType" value="softskilltopic" onChange={(e) => setOption(e.target.value)}/>
          <label for="softskilltopic">Soft Skill Topic</label>

          <input type="radio" id="softskillquestion" name="activityType" value="softskillquestion" onChange={(e) => setOption(e.target.value)}/>
          <label for="softskillquestion">Soft Skill Question</label>

          <input type="radio" id="quest" name="activityType" value="quest" onChange={(e) => setOption(e.target.value)}/>
          <label for="quest">Questionnaire</label>

          <input type="radio" id="interview" name="activityType" value="interview" onChange={(e) => setOption(e.target.value)}/>
          <label for="interview">Interview</label>

          <input type="radio" id="note" name="activityType" value="note" onChange={(e) => setOption(e.target.value)}/>
          <label for="note">Note</label>
        </div>
      </div>
      <div className='create-activity'>
        {renderOption()} 
      </div>
    </div>
  </div>
  ) : "";
}

export default Popup