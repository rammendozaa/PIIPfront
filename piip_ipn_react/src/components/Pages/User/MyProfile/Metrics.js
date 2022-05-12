import BarChart from "./BarChart"
import {useState, useEffect} from "react"
import PieChart from "../../../PieChart"
import "./Metrics.css"

function Metrics({userData}) {
    const [numberOfProblems,setNumberOfProblems] = useState(0)
    const [numberOfProgrammingTopics,setNumberOfProgrammingTopics] = useState(0)
    const [numberOfSoftSkillTopics,setNumberOfSoftSkillTopics] = useState(0)
    const [numberOfInterviews,setNumberOfInterviews] = useState(0)

    const getNumberOfInterviews = async() => {
        let formData = new FormData();
        formData.append('user_id', userData.user_id);
        const response = await fetch('/getNumberOfInterviews',{
            method: "POST",
            headers: {
                "Authorization": 'Bearer ' + userData.token
            },
            body: formData
        })
        const data = await response.json()
        setNumberOfInterviews(data.numberOfInterviews)
    }
    const getNumberOfProblemsSolved = async() => {
        let formData = new FormData();
        formData.append('user_id', userData.user_id);
        const response = await fetch('/getNumberOfProblemsSolvedByUser',{
            method: "POST",
            headers: {
                "Authorization": 'Bearer ' + userData.token
            },
            body: formData
        })
        const data = await response.json()
        setNumberOfProblems(data.numberOfProblems)
    }
    const getNumberOfProgrammingTopicsSolved = async() => {
        let formData = new FormData();
        formData.append('user_id', userData.user_id);
        const response = await fetch('/getNumberOfProgrammingTopicsSolvedByUser',{
            method: "POST",
            headers: {
                "Authorization": 'Bearer ' + userData.token
            },
            body: formData
        })
        const data = await response.json()
        setNumberOfProgrammingTopics(data.numberOfProgrammingTopics)
    }
    const getNumberOfSoftSkillTopicsSolved = async() => {
        let formData = new FormData();
        formData.append('user_id', userData.user_id);
        const response = await fetch('/getNumberOfSoftSkillTopicsSolvedByUser',{
            method: "POST",
            headers: {
                "Authorization": 'Bearer ' + userData.token
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
    }, []);

    /*
        UserData.map((data) => data.field)
    */
    const [problemsSolved, setProblemsSolved] = useState({
        labels: ["April 20","April 21","April 22","April 23","April 24"],
        datasets: [{
            label: "Problems solved in last month",
            data: [1,2,3,4,5],
            borderColor: "black",
            borderWidth: 2,
            backgroundColor: [
                "rgba(75,192,192,1)",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0",
            ]
        }]
    })
    const [cntByCategory, setCntByCategory] = useState({
        labels: ["Dp","Greedy","Brute Force","Graphs","Ad-Hoc"],
        datasets: [{
            label: "Problems solved in last month",
            data: [1,2,3,4,5],
            borderColor: "black",
            borderWidth: 2,
            backgroundColor: [
                "rgba(75,192,192,1)",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0",
            ]
        }]
    })
    return (
        <div className="metrics-container">
            <div className="categories">
                <h3 className="title">General View</h3>
                <div className="categories-container">    
                    <div className="category">
                        <div className="title">
                            <h2>Programming Topics</h2>
                        </div>
                        <div className="content">
                            <p>{numberOfProgrammingTopics} topics studied</p>
                        </div>                        
                    </div>
                    <div className="category">
                        <div className="title">
                            <h2>Soft Skill Topics</h2>
                        </div>
                        <div className="content">
                            <p>{numberOfSoftSkillTopics} topics studied</p>
                        </div>                        
                    </div>
                    <div className="category">
                        <div className="title">
                            <h2>Problems</h2>
                        </div>
                        <div className="content">
                            <p> {numberOfProblems} problems solved</p>
                        </div>                        
                    </div>
                    <div className="category">
                        <div className="title">
                            <h2>Interviews</h2>
                        </div>
                        <div className="content">
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
                                    <div className="recommendation">
                                        <p>Problem Name</p>
                                        <h2>Greedy</h2>
                                    </div>
                                    <div className="recommendation">
                                        <p>Problem Name</p>
                                        <h2>Graphs</h2>
                                    </div>
                                    <div className="recommendation">
                                        <p>Problem Name</p>
                                        <h2>Graphs</h2>
                                    </div>
                                    <div className="recommendation">
                                        <p>Problem Name</p>
                                        <h2>Graphs</h2>
                                    </div>
                                    <div className="recommendation">
                                        <p>Problem Name</p>
                                        <h2>Graphs</h2>
                                    </div>
                                    <div className="recommendation">
                                        <p>Problem Name</p>
                                        <h2>Graphs</h2>
                                    </div>
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