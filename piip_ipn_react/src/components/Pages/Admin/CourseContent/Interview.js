import { useState } from 'react'
import { NewActivity } from '../../../../../src/externalClasses'
import './Interview.css'

function CreateInterview({addActivity, activityIndex, sectionId}) {
    const [option,setOption] = useState();
    const [comment, setComment] = useState();
    const createUserInterview = () => {
        if (option === null || option === undefined) {
            alert("Please choose the type of interview to conduct.");
            return;
        }
        const newActivity = NewActivity((option === 1 ? "1:1" : "Mock interview"), comment, 5, option);
        addActivity(newActivity, activityIndex, sectionId);
    }
    return (
        <>
        <div className="add-interview-container">
            <div>
            <h3>Select interview type:</h3>
            </div>
            <div className='add-interview-options'>
                <input type="radio" id="one-on-one" name="activityType" value="one-on-one" onChange={() => setOption(1)}/>
                <label for="one-on-one">1:1</label>

                <input type="radio" id="mock" name="activityType" value="mock" onChange={() => setOption(2)}/>
                <label for="mock">Mock</label>
            </div>
            <br/>
        <h4>Comment? (Optional):</h4>
            <div className="d-flex-add-interview justify-content-center-add-interview">
                <textarea
                        className='text-area-add-interview'
                        id="input"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}>
                    </textarea>
        </div>
                    <div className="d-flex-add-interview justify-content-center-add-interview">
            <button type="button" class="btn-add-interview" onClick={createUserInterview}>Create interview</button>
                
            </div>
        </div>
        </>
    );
}

export default CreateInterview