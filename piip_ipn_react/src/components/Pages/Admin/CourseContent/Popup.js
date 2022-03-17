import {useState} from 'react'
import AddTopic from '../AddTopic/AddTopic'
import './Popup.css'
import SeeProblems from './SeeProblems'
import SeeTopics from './SeeTopics.js'

function Popup(props) {
  const [option,setOption] = useState("")
  const renderOption = () => {
    if(option === "problem"){
      return (
        <SeeProblems userData={props.userData}/>
      )
    }else if(option === "topic"){
      return (
        <SeeTopics/>
      )
    }else if(option === "softskill"){
      return (
        <h1>Soft Skill</h1>
      )
    }else if(option === "quest"){
      return (
        <h1>Questionnaire</h1>
      )
    }else if(option === "interview"){
      return (
        <h1>Interview</h1>
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

          <input type="radio" id="softskill" name="activityType" value="softskill" onChange={(e) => setOption(e.target.value)}/>
          <label for="softskill">Soft Skill</label>

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