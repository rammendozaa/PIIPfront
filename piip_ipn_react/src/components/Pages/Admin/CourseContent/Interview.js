import { NewActivity } from '../../../../../src/externalClasses'
import './Interview.css'

function CreateInterview({addActivity, activityIndex, sectionId}) {
    const createUserInterview = (interviewDescription) => {
        const newActivity = NewActivity("otra prueba mas", "solo quiero que funcione ", 5, null);
        addActivity(newActivity, activityIndex, sectionId);
    }
    return (
        <>
        <div>
        <form class="form-horizontal">
            <div class="form-group">
            <label class="col-sm-2 control-label">Comentario:</label>
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