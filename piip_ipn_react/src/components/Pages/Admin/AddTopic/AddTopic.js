import { useEffect, useRef, useState } from 'react';
import draftToHtml from 'draftjs-to-html';
import ReactHTMLParser from 'react-html-parser';
// Import Components
import RDWMathJax from './rdw-mathjax';
import { content } from '../../../../configs';
import './AddTopic.css'

const baseURL = "http://127.0.0.1:5000"

function AddTopic() {
    /*return (
        <>
            <div className="add-topic-container">
                <DraftEditor/>
                <ViewEditor/>
                <input type='text' placeholder="File Name"/>
                <button>Save</button>
            </div>
        </>
    );*/
    const [option, setOption] = useState("")
    const node = useRef();
    const [rawDraftContentState, setRawDraftContentState] = useState(null);
    const [json, setJSON] = useState('');

    const [filename, setFilename] = useState("")

    useEffect(() => {
        // Some async task (ie. getting editor data from DB)
        setTimeout(() => {
        setRawDraftContentState(content);
        setJSON(JSON.stringify(content));
        }, 1000);
    }, []);

    useEffect(() => {
        window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, node.current]);
    });

    const onContentStateChange = (rawDraftContentState) => {
        setJSON(JSON.stringify(rawDraftContentState));
    }

    const saveFile = async() => {
        if(filename.length === 0){
            alert("Please choose a file name");
            return;
        }
        if (option == "") {
            alert("Please select topic type");
            return;
        }
        console.log(json)
        localStorage.setItem('editorData', json);
        await fetch(baseURL + `/create-topic`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "topicType": option,
                "title": "this is a title",
                "description": "this is a descritpion",
                "topic_information": json,
            }),
        });
        alert("Topic saved succesfully!");
        setOption("");
        setJSON('');
        setFilename("");
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
                    <input type="text" placeholder="filename" value={filename} onChange={(e) => setFilename(e.target.value)}/>
                    <button onClick={saveFile} className="btn-create-activities">Save</button>
                </div>
            </div>
        </>
    );
}
export default AddTopic