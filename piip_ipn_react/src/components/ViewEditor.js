import React, { useState } from 'react';
import { EditorState, convertFromRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const DraftEditor = () => {
    const getSavedEditorData = () => {
        const savedData = localStorage.getItem('editorData');
        return savedData ? JSON.parse(savedData) : null;
    }
    const [editorState, setEditorState] = useState(
        () => {
            const rawEditorData = getSavedEditorData();
            if (rawEditorData !== null) {
                const contentState = convertFromRaw(rawEditorData);
                return EditorState.createWithContent(contentState);
            }else{
                return EditorState.createEmpty();
            }
        }
    );
    return (
        <>
            <Editor
                readOnly={true}
                editorState={editorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
            />
        </>      
    );
}

export default DraftEditor;