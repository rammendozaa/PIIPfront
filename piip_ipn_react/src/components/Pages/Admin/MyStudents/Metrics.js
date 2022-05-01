import PieChart from "../../../PieChart"
import {useState} from "react"
import "./Metrics.css"

function Metrics({userData}) {
    const [studentsStatus, setStudentsStatus] = useState({
        labels: ["Never interviewed", "Interviewed but not accepted", "Accepted in at least one intership"],
        datasets: [{
            label: "Problems solved in last month",
            data: [1,1,1],
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
        <>
            <div className="metrics-container-admin">
                <div className="metrics-admin">
                    <div className="top-admin">
                        <div className="small-metric-admin">
                            <h2>You currently have 10 active students</h2>
                        </div>
                        <div className="small-metric-admin">
                            <h2>You currently have 10 active students</h2>
                        </div>
                        <div className="small-metric-admin">
                            <h2>You currently have 10 active students</h2>
                        </div>
                    </div>
                    <div className="bottom-admin">
                        <div className="metrics-piechart-admin">
                            <h3 className="title-admin">Students' status</h3>
                            <div className="content-admin">
                                <PieChart data={studentsStatus}/>
                            </div>
                        </div>
                        <div className="metrics-piechart-admin">
                            <h3 className="title-admin">Students' status</h3>
                            <div className="content-admin">
                                <PieChart data={studentsStatus}/>
                            </div>
                        </div>
                        <div className="metrics-piechart-admin">
                            <h3 className="title-admin">Students' status</h3>
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