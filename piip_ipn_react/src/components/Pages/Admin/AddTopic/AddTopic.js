import { useEffect, useRef, useState } from 'react'
import draftToHtml from 'draftjs-to-html'
import ReactHTMLParser from 'react-html-parser'
// Import Components
import RDWMathJax from './rdw-mathjax'
import { content } from '../../../../configs'
import './AddTopic.css'
import RequestError from '../../../RequestError'

const baseURL = 'http://127.0.0.1:5000'

function AddTopic ({ userData }) {
  /* return (
        <>
            <div className="add-topic-container">
                <DraftEditor/>
                <ViewEditor/>
                <input type='text' placeholder="File Name"/>
                <button>Save</button>
            </div>
        </>
    ); */
  const [option, setOption] = useState('')
  const node = useRef()
  const [rawDraftContentState, setRawDraftContentState] = useState(null)
  const [json, setJSON] = useState('')
  const [errorCode, setErrorCode] = useState(null)

  const [filename, setFilename] = useState('')
  const [description, setDescription] = useState('')
  useEffect(() => {
    // Some async task (ie. getting editor data from DB)
    setTimeout(() => {
      setRawDraftContentState(content)
      setJSON(JSON.stringify(content))
    }, 1000)
  }, [])

  useEffect(() => {
    window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, node.current])
  })

  const onContentStateChange = (rawDraftContentState) => {
    setJSON(JSON.stringify(rawDraftContentState))
  }

  const saveFile = async () => {
    if (filename.length === 0 || description.length === 0) {
      alert("Topic name and description can't be empty")
      return
    }
    if (option == '') {
      alert('Please select topic type')
      return
    }
    localStorage.setItem('editorData', json)
    const response = await fetch('/create-topic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token,
        'User-Type': userData.role,
        'User-Id': userData.user_id,
      },
      body: JSON.stringify({
        topicType: option,
        title: filename,
        description,
        topicInformation: json,
        createdBy: userData.user_id
      })
    })
    if (response.status !== 200) {
      setErrorCode(response.status)
      return
    }
    alert('Topic saved succesfully!')
    setOption('')
    setJSON('')
    setFilename('')
    setDescription('')
    setRawDraftContentState(null)
  }

  if (errorCode !== null) {
    return <RequestError errorCode={errorCode}/>
  }

  return (
        <>
            <div className="save-topic">
                <input type="text" placeholder="Topic name" value={filename} onChange={(e) => setFilename(e.target.value)} className="input-topic"/>
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="input-topic"/>
                <div className='options-container'>
                    <div className='optionx'>
                        <input type="radio" id="SoftSkill" name="topicType" value="SoftSkill" onChange={(e) => setOption(e.target.value)}/>
                        <label htmlFor="SoftSkill">Soft Skill</label>
                    </div>
                    <div className='optionx'>
                        <input type="radio" id="AlgorithmTopic" name="topicType" value="AlgorithmTopic" onChange={(e) => setOption(e.target.value)}/>
                        <label htmlFor="AlgorithmTopic">Algorithm Topic</label>
                    </div>
                </div>
                <button onClick={saveFile} className="btn-create-activities">Save</button>
            </div>
            <div className="add-topic-container">
                <RDWMathJax rawDraftContentState={rawDraftContentState} onContentStateChange={onContentStateChange} />
            </div>
        </>
  )
}
export default AddTopic
