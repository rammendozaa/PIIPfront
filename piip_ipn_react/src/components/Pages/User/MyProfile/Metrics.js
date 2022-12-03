import BarChart from './BarChart'
import { useState, useEffect } from 'react'
import PieChart from '../../../PieChart'
import './Metrics.css'
import { Navigate } from 'react-router-dom'

function Metrics ({ userData }) {
  const [numberOfProblems, setNumberOfProblems] = useState(0)
  const [numberOfProgrammingTopics, setNumberOfProgrammingTopics] = useState(0)
  const [numberOfSoftSkillTopics, setNumberOfSoftSkillTopics] = useState(0)
  const [numberOfInterviews, setNumberOfInterviews] = useState(0)
  const [recommendations, setRecommendations] = useState([])
  const [problemId, setProblemId] = useState(-1)

  const colors = ['#CC4948', '#FFCC00', '#7A577A', '#8BC441']
  const leftColor = ['#912c2c', '#9e7e1c', '#553755', '#5f8330']

  const [cntByTag, setCntByTag] = useState({
    Dp: 1,
    Greedy: 2,
    Graphs: 3
  })
  const [cntByDay, setCntByDay] = useState({
    '14 May': 10,
    '15 May': 15,
    '16 May': 5
  })
  const [problemsSolved, setProblemsSolved] = useState({
    labels: Object.keys(cntByDay),
    datasets: [{
      label: 'Problems solved in last month',
      data: Object.keys(cntByDay),
      borderColor: 'black',
      borderWidth: 2,
      backgroundColor: [
        'rgba(75,192,192,1)',
        '#ecf0f1',
        '#50AF95',
        '#f3ba2f',
        '#2a71d0'
      ]
    }]
  })
  const [cntByCategory, setCntByCategory] = useState({
    labels: Object.keys(cntByTag),
    datasets: [{
      label: 'Problems solved in last month',
      data: Object.values(cntByTag),
      borderColor: 'black',
      borderWidth: 2,
      backgroundColor: [
        'rgba(75,192,192,1)',
        '#ecf0f1',
        '#50AF95',
        '#f3ba2f',
        '#2a71d0'
      ]
    }]
  })
  const getCntByDay = async () => {
    const formData = new FormData()
    formData.append('user_id', userData.user_id)
    const response = await fetch('/getNumberOfProblemsByDay', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userData.token
      },
      body: formData
    })
    const data = await response.json()
    setCntByDay(data)
    setProblemsSolved({
      labels: Object.keys(data),
      datasets: [{
        label: 'Problems solved in last month',
        data: Object.values(data),
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: [
          'rgba(75,192,192,1)',
          '#ecf0f1',
          '#50AF95',
          '#f3ba2f',
          '#2a71d0'
        ]
      }]
    })
  }
  const getCntByTag = async () => {
    const formData = new FormData()
    formData.append('user_id', userData.user_id)
    const response = await fetch('/getNumberOfProblemsByTag', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userData.token
      },
      body: formData
    })
    const data = await response.json()
    setCntByTag(data)
    setCntByCategory({
      labels: Object.keys(data),
      datasets: [{
        label: 'Problems solved in last month',
        data: Object.values(data),
        borderColor: 'black',
        borderWidth: 2,
        backgroundColor: [
          'rgba(75,192,192,1)',
          '#ecf0f1',
          '#50AF95',
          '#f3ba2f',
          '#2a71d0'
        ]
      }]
    })
  }
  const getRecommendations = async () => {
    const formData = new FormData()
    formData.append('user_id', userData.user_id)
    const response = await fetch('/getRecommendations', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userData.token
      },
      body: formData
    })
    const data = await response.json()
    setRecommendations(data)
  }
  const getNumberOfInterviews = async () => {
    const formData = new FormData()
    formData.append('user_id', userData.user_id)
    const response = await fetch('/getNumberOfInterviews', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userData.token
      },
      body: formData
    })
    const data = await response.json()
    setNumberOfInterviews(data.numberOfInterviews)
  }
  const getNumberOfProblemsSolved = async () => {
    const formData = new FormData()
    formData.append('user_id', userData.user_id)
    const response = await fetch('/getNumberOfProblemsSolvedByUser', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userData.token
      },
      body: formData
    })
    const data = await response.json()
    setNumberOfProblems(data.numberOfProblems)
  }
  const getNumberOfProgrammingTopicsSolved = async () => {
    const formData = new FormData()
    formData.append('user_id', userData.user_id)
    const response = await fetch('/getNumberOfProgrammingTopicsSolvedByUser', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userData.token
      },
      body: formData
    })
    const data = await response.json()
    setNumberOfProgrammingTopics(data.numberOfProgrammingTopics)
  }
  const getNumberOfSoftSkillTopicsSolved = async () => {
    const formData = new FormData()
    formData.append('user_id', userData.user_id)
    const response = await fetch('/getNumberOfSoftSkillTopicsSolvedByUser', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userData.token
      },
      body: formData
    })
    const data = await response.json()
    setNumberOfSoftSkillTopics(data.numberOfSoftSkillsTopics)
  }
  useEffect(() => {
    getNumberOfProblemsSolved()
    getNumberOfProgrammingTopicsSolved()
    getNumberOfSoftSkillTopicsSolved()
    getNumberOfInterviews()
    getCntByTag()
    getCntByDay()
    getRecommendations()
  }, [])
  if (problemId !== -1) {
    const url = '/problem/' + problemId
    return (
            <Navigate to={url}/>
    )
  }
  /*
        UserData.map((data) => data.field)
    */
  return (
        <div className="metrics-container">
            <div className="categories">
                <h3 className="title">General View</h3>
                <div className="categories-container">
                    <div className="category blue">
                        <div className="category-title">
                            <h2>Programming Topics</h2>
                        </div>
                        <div className="category-content">
                            <p>{numberOfProgrammingTopics} topics studied</p>
                        </div>
                    </div>
                    <div className="category yellow">
                        <div className="category-title">
                            <h2>Soft Skill Topics</h2>
                        </div>
                        <div className="category-content">
                            <p>{numberOfSoftSkillTopics} topics studied</p>
                        </div>
                    </div>
                    <div className="category green">
                        <div className="category-title">
                            <h2>Problems</h2>
                        </div>
                        <div className="category-content">
                            <p> {numberOfProblems} problems solved</p>
                        </div>
                    </div>
                    <div className="category purple">
                        <div className="category-title">
                            <h2>Interviews</h2>
                        </div>
                        <div className="category-content">
                            <p> {numberOfInterviews} interviews attended</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="charts">
                <div className="top">
                    <div className="metrics-barchart">
                        <h3 className="title">Problems solved in last 10 days.</h3>
                        <BarChart data={problemsSolved}/>
                    </div>
                </div>
                <div className="bottom">
                    <div className="bottom-container">
                        <div className="keep-practicing">
                            <div className="title">
                                <h3>Keep practicing</h3>
                            </div>
                            <div className="recommendations">
                                <div className="recommendations-container">
                                    {
                                        recommendations.map((row, idx) =>
                                            <div className="recommendation" style={{ 'background-color': colors[idx], 'border-left': '5px solid' + leftColor[idx] }} onClick={() => setProblemId(row.id)}>
                                                <p>{row.title}</p>
                                                <h2>{row.tags[0]}</h2>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="metrics-piechart">
                            <h3 className="title">Problems solved by topic.</h3>
                            <PieChart data={cntByCategory}/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
  )
}

export default Metrics
