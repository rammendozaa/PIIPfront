import MarkdownRender from '../../MarkDownRender/MarkdownRender'
import './Problem.css'
// import Compiler from "../Compiler.js";
import Compiler2 from './Compiler2'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import ReactHTMLParser from 'react-html-parser'
import { useSelector } from 'react-redux'
import RequestError from '../../RequestError'

function Problem ({ userData }) {
  const { template } = useSelector(state => state.userTemplate)
  const { activity } = useSelector(state => state.userActivity)
  const { problem_id } = useParams()
  const [data, setData] = useState()
  const [errorCode, setErrorCode] = useState(null)
  useEffect(() => {
    const formData = new FormData()
    formData.append('problem_id', problem_id)
    fetch('/problem', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userData.token,
        'User-Type': userData.role,
        'User-Id': userData.user_id,
      },
      body: formData
    })
    .then(async res => {
        if (res.status !== 200) {
          const error_status = res.status
          return Promise.reject(error_status);
        }  
        return res.json()
    })
    .then(data => {
      setData(data)
    })
    .catch(error_status => {
      setErrorCode(error_status)
      return
    })
    }, [])
  const node = useRef()
  useEffect(() => {
    window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, node.current])
  })
  const fixHtml = (text) => {
    return text.replaceAll('$$$', '$')
  }
  if (errorCode !== null) {
    return <RequestError errorCode={errorCode}/>
  }
  return (
        <>
        {
            data &&
            <div className="problem-container">
                <div className="problem-data">
                    <div className="info">
                        <div className="info-header">
                            <a href={data.url} target="_blank" rel="noreferrer"><h1>{data.title}</h1></a>
                        </div>
                        <dl className="info-body">
                            <div className="problem-info-row">
                                <dt><b>Time Limit:</b></dt>
                                <dd>{data.time_limit}</dd>
                            </div>
                            <div className="problem-info-row">
                                <dt><b>Memory Limit:</b></dt>
                                <dd>{data.memory_limit}</dd>
                            </div>
                            <div className="problem-info-row">
                                <dt><b>Tags:</b></dt>
                                <dd>
                                    <ul style={{ 'list-style-type': 'none' }}>
                                        {
                                            data.tags.map((row) =>
                                                <li>{row}</li>
                                            )
                                        }
                                    </ul>
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <div className="description" ref={node} key={Math.random()}>
                        <div className="statement">
                            <b>Statement</b>
                            {ReactHTMLParser(fixHtml(data.description))}
                        </div>
                        <div className="inputFormat">
                            <b>Input</b>
                            {ReactHTMLParser(fixHtml(data.input))}
                        </div>
                        <div className="outputFormat">
                            <b>Output</b>
                            {ReactHTMLParser(fixHtml(data.ouput))}
                        </div>
                        <div className="examples">
                            <b>Example</b>
                            {ReactHTMLParser(fixHtml(data.test_cases))}
                        </div>
                    </div>
                </div>
                <div className="problem-execution">
                    <Compiler2 userData={userData} url={data.url} problem_id={problem_id}/>
                </div>
            </div>
        }
        </>
  )
}
export default Problem
