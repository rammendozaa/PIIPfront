import { useEffect, useRef, useState } from 'react'
import draftToHtml from 'draftjs-to-html'
import convertFromRaw from 'draft-js'
import ReactHTMLParser from 'react-html-parser'
// Import Components
import { useNavigate, useParams } from 'react-router-dom'
import RDWMathJax from '../AddTopic/rdw-mathjax'
import { content } from '../../../../configs'
import './EditTopic.css'
const baseURL = 'http://127.0.0.1:5000'

function EditTopic ({ userData }) {
  const [option, setOption] = useState('')
  const node = useRef()
  const [rawDraftContentState, setRawDraftContentState] = useState(null)
  const [json, setJSON] = useState('')

  const [filename, setFilename] = useState('')
  const [description, setDescription] = useState('')
  const { topic_id } = useParams()
  const { topic_type } = useParams()
  const topic_route = (topic_type === 'algorithm') ? 'algorithmTopics' : 'softSkillsTopics'

  useEffect(() => {
    fetch(`/${topic_route}?topicId=${topic_id}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + userData.token,
        'User-Type': userData.role,
        'User-Id': userData.user_id,
      }
    })
      .then(res => res.json())
      .then(data => {
        setFilename(data.title)
        setDescription(data.description)
        setRawDraftContentState(JSON.parse(data.topicInformation))
        setJSON(data.topicInformation)
      })
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
    localStorage.setItem('editorData', json)
    await fetch('/update-topic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token,
        'User-Type': userData.role,
        'User-Id': userData.user_id,
      },
      body: JSON.stringify({
        topicType: topic_route,
        title: filename,
        description,
        topicInformation: json,
        createdBy: userData.user_id,
        id: topic_id
      })
    })
    alert('Topic saved succesfully!')
    /* setOption("");
        setJSON('');
        setFilename("");
        setDescription("");
        setRawDraftContentState(null); */
  }

  return (
        <div className='edit-topic-container'>
            <div className="save-topic">
                <input type="text" placeholder="Topic name" value={filename} onChange={(e) => setFilename(e.target.value)} className="input-topic"/>
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="input-topic"/>
                <button onClick={saveFile} className="btn-create-activities">Save</button>
            </div>
            <div className="add-topic-container">
                <RDWMathJax rawDraftContentState={rawDraftContentState} onContentStateChange={onContentStateChange} readOnly={false}/>
            </div>
        </div>
  )
}
export default EditTopic
