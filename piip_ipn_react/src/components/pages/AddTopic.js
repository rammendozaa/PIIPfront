import { useEffect, useRef, useState } from 'react';
import draftToHtml from 'draftjs-to-html';
import ReactHTMLParser from 'react-html-parser';

// Import Components
import RDWMathJax from '../rdw-mathjax';
import { content } from '../../configs';

import './AddTopic.css'

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

    const saveFile = () => {
        if(filename.length === 0){
            alert("Please chose a file name");
            return;
        }
        localStorage.setItem('editorData:'+filename, JSON.stringify(rawDraftContentState));
    }

    return (
        <>
            <div className="add-topic-container">
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
                    <button onClick={saveFile}>Save</button>
                </div>
            </div>
        </>
    );
    /*return (
        <h1>Hola</h1>
    )*/
}
export default AddTopic