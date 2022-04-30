import BarChart from "./BarChart"
import {useState} from "react"
import PieChart from "./PieChart"
import "./Metrics.css"

function Metrics({user}) {
    /*
        UserData.map((data) => data.field)
    */
    const [userData, setUserData] = useState({
        labels: ["April 20","April 21","April 22","April 23","April 24"],
        datasets: [{
            label: "Problems solved in last month",
            data: [1,2,3,4,5],
            borderColor: "black",
            borderWidth: 2
        }]
    })
    return (
        <div className="metrics-container">
            <div className="topics-problems">
                <h1>Here</h1>
            </div>
            <div className="charts">
                <div className="top">
                    <div className="metrics-barchart">
                        <BarChart data={userData}/>
                    </div>
                </div>
                <div className="bottom">
                    <div className="bottom-container">
                        <div className="metrics-piechart">
                            <PieChart data={userData}/>
                        </div>
                        <div className="metrics-piechart">
                            <PieChart data={userData}/>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Metrics