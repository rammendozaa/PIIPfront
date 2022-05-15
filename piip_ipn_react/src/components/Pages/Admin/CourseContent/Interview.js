import { useState } from 'react'
import { NewActivity } from '../../../../../src/externalClasses'
import './Interview.css'

function CreateInterview({addActivity, activityIndex, sectionId}) {
    const [option,setOption] = useState(1);
    const [comment, setComment] = useState();
    const createUserInterview = () => {
        const newActivity = NewActivity((option === 1 ? "1:1" : "Mock interview"), comment, 5, option);
        addActivity(newActivity, activityIndex, sectionId);
    }
    return (
        <>
        <div>
        <form class="form-horizontal">
            <div class="form-group">
            <div className='options'>
                <input type="radio" id="one-on-one" name="activityType" value="one-on-one" onChange={() => setOption(1)}/>
                <label for="one-on-one">1:1</label>

                <input type="radio" id="mock" name="activityType" value="mock" onChange={() => setOption(2)}/>
                <label for="mock">Mock</label>
            </div>
            <label class="col-sm-2 control-label">Comentario: (Opcional)</label>
                <div class="col-sm-10">
                <textarea class="form-control" rows="3"></textarea>
                </div>
            </div>
        </form>
        <button type="button" class="btn btn-lg btn-primary" onClick={createUserInterview}>Agendar entrevista</button>
        </div>
        </>
    );
}

export default CreateInterview