import {useState} from 'react'
import AddTopic from '../AddTopic/AddTopic'
import './Popup.css'
import SeeProblems from './SeeProblems'
import SeeTopics from './SeeTopics'
import SeeSoftSkills from './SeeSoftSkills'
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
          <SeeTopics
          userData={props.userData}
          addActivity={props.functionToAddActivity}
          activityIndex={props.activityIndex}
          sectionId={props.sectionId}
          />
        )
      }else if(option === "softskill"){
        return (
          <SeeSoftSkills
          userData={props.userData}
          addActivity={props.functionToAddActivity}
          activityIndex={props.activityIndex}
          sectionId={props.sectionId}
          />
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

          <input type="radio" id="softskill" name="activityType" value="softskill" onChange={(e) => setOption(e.target.value)}/>
          <label for="softskill">Soft Skill</label>

          <input type="radio" id="softskillquestion" name="activityType" value="softskillquestion" onChange={(e) => setOption(e.target.value)}/>
          <label for="softskillquestion">Soft Skill Question</label>

          <input type="radio" id="quest" name="activityType" value="quest" onChange={(e) => setOption(e.target.value)}/>
          <label for="quest">Questionnaire</label>

          {props.showInterview === true && <>
          <input type="radio" id="interview" name="activityType" value="interview" onChange={(e) => setOption(e.target.value)}/>
          <label for="interview">Interview</label></>}
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