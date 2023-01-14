import { useState, useEffect, useRef } from 'react'
// import MarkdownRender from "../MarkdownRender";
import './Topic.css'
import draftToHtml from 'draftjs-to-html'
import ReactHTMLParser from 'react-html-parser'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import RDWMathJax from '../Admin/AddTopic/rdw-mathjax'
const baseURL = 'http://127.0.0.1:5000'

function Topic ({ userData }) {
  const navigate = useNavigate()
  const userId = userData.user_id
  const [rawDraftContentState, setRawDraftContentState] = useState(null)
  const { activity } = useSelector(state => state.userActivity)
  const { topic_id } = useParams()
  const { topic_type } = useParams()
  const topic_route = (topic_type === 'algorithm') ? 'algorithmTopics' : 'softSkillsTopics'
  const [json, setJSON] = useState(
    localStorage.getItem('editorData')
  )
  const [topicData, setTopicData] = useState({
    id: 2,
    topicInformation: '{"blocks":[{"key":"637gr","text":"111111111111111111111111111111111111111111111","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":45,"style":"color-rgb(0,0,0)"},{"offset":0,"length":45,"style":"fontsize-medium"},{"offset":0,"length":45,"style":"fontfamily-PT Sans\\", sans-serif"}],"entityRanges":[],"data":{}},{"key":"307ac","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"44a2k","text":"22222222","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"color-rgb(0,0,0)"},{"offset":0,"length":8,"style":"fontsize-medium"},{"offset":0,"length":8,"style":"fontfamily-PT Sans\\", sans-serif"}],"entityRanges":[],"data":{"text-align":"start"}},{"key":"5rkjl","text":"2222222222222222222222222222222222222","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":37,"style":"color-rgb(0,0,0)"},{"offset":0,"length":37,"style":"fontfamily-PT Sans\\", sans-serif"}],"entityRanges":[],"data":{"text-align":"left"}},{"key":"9r2vk","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"text-align":"start"}},{"key":"4a3bh","text":"33333333","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"color-rgb(0,0,0)"},{"offset":0,"length":8,"style":"fontfamily-PT Sans\\", sans-serif"}],"entityRanges":[],"data":{"text-align":"start"}},{"key":"4luqe","text":"2222222222222222222222222222222222222","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":37,"style":"color-rgb(0,0,0)"},{"offset":0,"length":37,"style":"fontfamily-PT Sans\\", sans-serif"}],"entityRanges":[],"data":{"text-align":"left"}},{"key":"1demf","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"text-align":"start"}},{"key":"f07ud","text":"33333333","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"color-rgb(0,0,0)"},{"offset":0,"length":8,"style":"fontfamily-PT Sans\\", sans-serif"}],"entityRanges":[],"data":{"text-align":"start"}},{"key":"7mv0p","text":"2222222222222222222222222222222222222","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":37,"style":"color-rgb(0,0,0)"},{"offset":0,"length":37,"style":"fontfamily-PT Sans\\", sans-serif"}],"entityRanges":[],"data":{"text-align":"left"}},{"key":"fu1ae","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"text-align":"start"}},{"key":"f2ens","text":"33333333","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"color-rgb(0,0,0)"},{"offset":0,"length":8,"style":"fontfamily-PT Sans\\", sans-serif"}],"entityRanges":[],"data":{"text-align":"start"}},{"key":"cfocm","text":"2222222222222222222222222222222222222","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":37,"style":"color-rgb(0,0,0)"},{"offset":0,"length":37,"style":"fontfamily-PT Sans\\", sans-serif"}],"entityRanges":[],"data":{"text-align":"left"}},{"key":"eau76","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{"text-align":"start"}},{"key":"bngm5","text":"33333333","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"color-rgb(0,0,0)"},{"offset":0,"length":8,"style":"fontfamily-PT Sans\\", sans-serif"}],"entityRanges":[],"data":{"text-align":"left"}}],"entityMap":{}}',
    description: 'this is a descritpion',
    title: 'aaaa'
  })

  const updateUserTemplateActivity = async (user_activity_id, status_id) => {
    await fetch(
      baseURL + `/user/activity/${user_activity_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userData.token
        },
        body: JSON.stringify({
          statusId: status_id
        })
      })
  }

  const updateUserTopic = async (status_id) => {
    await fetch(
      baseURL + `/user/${userId}/topic/${topic_type}/${topic_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userData.token
        },
        body: JSON.stringify({
          statusId: status_id
        })
      })
    if (status_id === 4) {
      alert('Topic progress saved succesfully.')
    }
  }

  useEffect(() => {
    if ((activity !== undefined && activity !== null) && activity.topicInformation) {
      setJSON(activity.topicInformation)
      setTopicData(activity)
    } else {
      fetch(`/${topic_route}?topicId=${topic_id}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + userData.token
        }
      })
        .then(res => res.json())
        .then(data => {
          setJSON(data.topicInformation)
          setRawDraftContentState(JSON.parse(data.topicInformation))
          setTopicData(data)
        })
    }
    if (userData.role === 'user') {
      updateUserTopic(2)
      if ((activity !== undefined && activity !== null) && activity.user_activity_id) {
        updateUserTemplateActivity(activity.user_activity_id, 2)
      }
    }
  }, [])

  const handleButtonClick = async () => {
    if (userData.role === 'user') {
      updateUserTopic(4)
  		if ((activity !== undefined && activity !== null) && activity.user_activity_id) {
	  		updateUserTemplateActivity(activity.user_activity_id, 4)
		  }
      navigate('/my-course')
    }
  }
  const onContentStateChange = (rawDraftContentState) => {
    setJSON(JSON.stringify(rawDraftContentState))
  }
  const node = useRef()
  useEffect(() => {
    window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, node.current])
  })
  return (
    <>
      <div className="topic-container">
        <div className="topic">
        <h1 className="topic-title">
              {topicData.title}: {topicData.description}
        </h1>
        <hr className="hr-style"/>
            {/* <div className="parser" ref={node} key={Math.random()}>
              {json && ReactHTMLParser(draftToHtml(JSON.parse(json)))}
            </div> */}
            <RDWMathJax rawDraftContentState={rawDraftContentState} onContentStateChange={onContentStateChange} readOnly={true}/>
            </div>
            {(userData.role === 'user') &&
              <div className="d-flex-topic justify-content-center-topic">
                <button button type="button" className="btn-topic btn-light-topic"
                  onClick={() => { navigate('/my-course') }}>
                    Click here to go to your course!
                </button>
                {(activity !== undefined && activity !== null && activity.activity_progress !== undefined && activity.activity_progress !== null && activity.activity_progress.status_id !== 4) &&
                <button type="button" className="btn-topic btn-primary-topic"
                  onClick={() => { handleButtonClick() }}>
                    Click here to mark this topic as read!
                </button>}
              </div>
            }
      </div>
    </>
  )
}

export default Topic
