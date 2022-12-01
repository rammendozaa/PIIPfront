import PieChart from "../../../PieChart"
import {useState,useEffect} from "react"
import "./Metrics.css"

function Metrics({userData}) {
    const [numberOfStudents, setNumberOfStudents] = useState(0)
    const [numberOfGraduated, setNumberOfGraduated] = useState(0)
    const [numberOfLosers, setNumberOfLosers] = useState(0)
    const [historicalInterviewData, setHistoricalInterviewData] = useState({
        "cntAccepted": 5,
        "cntRejected": 3,
        "cntNever": 1
    })
    const [currentInterviewData, setCurrentInterviewData] = useState({
        "cntAccepted": 6,
        "cntRejected": 3,
        "cntNever": 1
    })
    const [studentsStatus, setStudentsStatus] = useState({
        labels: ["Never interviewed", "Interviewed but not accepted", "Accepted in at least one intership"],
        datasets: [{
            label: "Problems solved in last month",
            data: [historicalInterviewData.never,historicalInterviewData.rejected, historicalInterviewData.accepted],
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
    const [currentStudentsStatus, setCurrentStudentsStatus] = useState({
        labels: ["Never interviewed", "Interviewed but not accepted", "Accepted in at least one intership"],
        datasets: [{
            label: "Problems solved in last month",
            data: [currentInterviewData.never,currentInterviewData.rejected, currentInterviewData.accepted],
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
    const getCurrentUsersInteviewData = async() => {
        let formData = new FormData();
        formData.append('user_id', userData.user_id);
        const response = await fetch('/getCurrentStudentsInterviewsData',{
            method: "POST",
            headers: {
                "Authorization": 'Bearer ' + userData.token
            },
            body: formData
        })
        const data = await response.json()
        setCurrentInterviewData(data)
        setCurrentStudentsStatus({
            labels: ["Never interviewed", "Interviewed but not accepted", "Accepted in at least one intership"],
            datasets: [{
                label: "Problems solved in last month",
                data: [data.cntNever2,data.cntRejected2, data.cntAccepted2],
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
    }
    const getUsersInteviewData = async() => {
        let formData = new FormData();
        formData.append('user_id', userData.user_id);
        const response = await fetch('/getStudentsInterviewsData',{
            method: "POST",
            headers: {
                "Authorization": 'Bearer ' + userData.token
            },
            body: formData
        })
        const data = await response.json()
        setHistoricalInterviewData(data)
        setStudentsStatus({
            labels: ["Never interviewed", "Interviewed but not accepted", "Accepted in at least one intership"],
            datasets: [{
                label: "Problems solved in last month",
                data: [data.cntNever,data.cntRejected, data.cntAccepted],
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
    }
    const getNumberOfLosers = async() => {
        let formData = new FormData();
        formData.append('user_id', userData.user_id);
        const response = await fetch('/getNumberOfLosers',{
            method: "POST",
            headers: {
                "Authorization": 'Bearer ' + userData.token
            },
            body: formData
        })
        const data = await response.json()
        setNumberOfLosers(data.numberOfLosers)
    }
    const getNumberOfGraduated = async() => {
        let formData = new FormData();
        formData.append('user_id', userData.user_id);
        const response = await fetch('/getNumberOfGraduatedStudents',{
            method: "POST",
            headers: {
                "Authorization": 'Bearer ' + userData.token
            },
            body: formData
        })
        const data = await response.json()
        setNumberOfGraduated(data.numberOfGraduated)
    }
    const getNumberOfActiveStudents = async() => {
        let formData = new FormData();
        formData.append('user_id', userData.user_id);
        const response = await fetch('/getNumberOfActiveStudents',{
            method: "POST",
            headers: {
                "Authorization": 'Bearer ' + userData.token
            },
            body: formData
        })
        const data = await response.json()
        setNumberOfStudents(data.numberOfStudents)
    }
    useEffect(() => {
        getNumberOfActiveStudents()
        getNumberOfGraduated()
        getNumberOfLosers()
        getUsersInteviewData()
        getCurrentUsersInteviewData()
    }, []);
    return (
        <>
            <div className="metrics-container-admin">
                <div className="metrics-admin">
                    <div className="top-admin">
                        <div className="small-metric-admin">
                            <h2>You currently have {numberOfLosers} inactive students</h2>
                        </div>
                        <div className="small-metric-admin">
                            <h2>You currently have {numberOfStudents} active students</h2>
                        </div>
                        <div className="small-metric-admin">
                            <h2>You currently have {numberOfGraduated} graduated students</h2>
                        </div>
                    </div>
                    <div className="bottom-admin">
                        <div className="metrics-piechart-admin">
                            <h3 className="title-admin">Current Interview Data</h3>
                            <div className="content-admin">
                                <PieChart data={currentStudentsStatus}/>
                            </div>
                        </div>
                        <div className="metrics-piechart-admin">
                            <h3 className="title-admin">Historical Interview Data</h3>
                            <div className="content-admin">
                                <PieChart data={studentsStatus}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Metrics