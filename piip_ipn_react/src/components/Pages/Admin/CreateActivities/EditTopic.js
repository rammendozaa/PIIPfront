import { useEffect, useRef, useState } from 'react';
import draftToHtml from 'draftjs-to-html';
import convertFromRaw from 'draft-js'
import ReactHTMLParser from 'react-html-parser';
// Import Components
import { useNavigate, useParams } from "react-router-dom";
import RDWMathJax from '../AddTopic/rdw-mathjax';
import { content } from '../../../../configs';
import '../AddTopic/AddTopic.css'

const baseURL = "http://127.0.0.1:5000"

function EditTopic({userData}) {
    const [option, setOption] = useState("")
    const node = useRef();
    const [rawDraftContentState, setRawDraftContentState] = useState(null);
    const [json, setJSON] = useState('');

    const [filename, setFilename] = useState("")
    const [description, setDescription] = useState("")
    const {topic_id} = useParams();
    const {topic_type} = useParams();
    const topic_route = (topic_type === "algorithm") ? "algorithmTopics" : "softSkillsTopics";

    useEffect(() => {
        fetch(`/${topic_route}?topicId=${topic_id}`, {
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            setRawDraftContentState(JSON.parse(data['topicInformation']));
            setJSON(data['topicInformation']);
        });
    }, []);


    useEffect(() => {
        window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, node.current]);
    });

    const onContentStateChange = (rawDraftContentState) => {
        setJSON(JSON.stringify(rawDraftContentState));
    }

    const saveFile = async() => {
        if(filename.length === 0 || description.length === 0){
            alert("Topic name and description can't be empty");
            return;
        }
        if (option == "") {
            alert("Please select topic type");
            return;
        }
        console.log(json)
        localStorage.setItem('editorData', json);
        await fetch(baseURL + `/update-topic`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "topicType": option,
                "title": filename,
                "description": description,
                "topicInformation": json,
                "createdBy": userData.user_id,
                "id": topic_id
            }),
        });
        alert("Topic saved succesfully!");
        /*setOption("");
        setJSON('');
        setFilename("");
        setDescription("");
        setRawDraftContentState(null);*/
    }

    return (
        <>
            <div className="add-topic-container">
                <div className='options-container'>
                    <div className='optionx'>
                        <input type="radio" id="SoftSkill" name="topicType" value="SoftSkill" onChange={(e) => setOption(e.target.value)}/>
                        <label for="SoftSkill">Soft Skill</label>
                    </div>
                    <div className='optionx'>
                        <input type="radio" id="AlgorithmTopic" name="topicType" value="AlgorithmTopic" onChange={(e) => setOption(e.target.value)}/>
                        <label for="AlgorithmTopic">Algorithm Topic</label>
                    </div>                            
                </div>
                <RDWMathJax rawDraftContentState={rawDraftContentState} onContentStateChange={onContentStateChange} />
                <div className="preview-container">
                    <h2>Preview</h2>
                    <hr />
                    <div className="preview">
                        <div ref={node} key={Math.random()}>
                            {json && ReactHTMLParser(draftToHtml(JSON.parse(json)))}
                        </div>
                    </div>
                </div>
                <div className="save">
                    <input type="text" placeholder="Topic name" value={filename} onChange={(e) => setFilename(e.target.value)} className="input-topic"/>
                    <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="input-topic"/>
                    <button onClick={saveFile} className="btn-create-activities">Save</button>
                </div>
            </div>
        </>
    );
}
export default EditTopic