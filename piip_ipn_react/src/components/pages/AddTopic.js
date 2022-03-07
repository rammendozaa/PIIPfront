import DraftEditor from "../DraftEditor";
import ViewEditor from "../ViewEditor";

import './AddTopic.css'

function AddTopic() {
    return (
        <>
            <div className="add-topic-container">
                <DraftEditor/>
                <ViewEditor/>
            </div>
        </>
    );
}
export default AddTopic