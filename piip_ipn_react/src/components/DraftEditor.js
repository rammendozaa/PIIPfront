import React, { useState } from 'react';
import { EditorState, convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';


const DraftEditor = () => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const  [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    const raw = convertToRaw(editorState.getCurrentContent());
    saveEditorContent(raw);
    //convertContentToHTML();
  }
  const saveEditorContent = (data) => {
    console.log("Saving data")
    localStorage.setItem('editorData', JSON.stringify(data));
  }
  /*const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML({
      entityToHTML: (entity, originalText) => {
        if (entity.type === 'IMAGE') {          
          return `<img src="${entity.data.src}" />`;
        }
        return originalText;
      },
    })(editorState.getCurrentContent());
    console.log(currentContentAsHTML)
    setConvertedContent(currentContentAsHTML);
  }*/
  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }
  return (
    <>
    <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
    </>      
  );
}

export default DraftEditor;