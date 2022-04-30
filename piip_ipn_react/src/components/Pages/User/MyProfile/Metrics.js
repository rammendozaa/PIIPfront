import BarChart from "./BarChart"
import {useState} from "react"
import PieChart from "./PieChart"
import "./Metrics.css"

function Metrics({user}) {
    /*
        UserData.map((data) => data.field)
    */
    const [problemsSolved, setProblemsSolved] = useState({
        labels: ["April 20","April 21","April 22","April 23","April 24"],
        datasets: [{
            label: "Problems solved in last month",
            data: [1,2,3,4,5],
            borderColor: "black",
            borderWidth: 2
        }]
    })
    const [cntByCategory, setCntByCategory] = useState({
        labels: ["Dp","Greedy","Brute Force","Graphs","Ad-Hoc"],
        datasets: [{
            label: "Problems solved in last month",
            data: [1,2,3,4,5],
            borderColor: "black",
            borderWidth: 2
        }]
    })
    return (
        <div className="metrics-container">
            <div className="categories">
                <h3>Vista General</h3>
                <div className="categories-container">    
                    <div className="category">
                        <div className="title">
                            <h2>Topics</h2>
                        </div>
                        <div className="content">
                            <p>5 topics studied</p>
                        </div>                        
                    </div>
                    <div className="category">
                        <div className="title">
                            <h2>Problems</h2>
                        </div>
                        <div className="content">
                            <p>83 problems solved</p>
                        </div>                        
                    </div>
                    <div className="category">
                        <div className="title">
                            <h2>Interviews</h2>
                        </div>
                        <div className="content">
                            <p>5 interviews attended</p>
                        </div>                        
                    </div>
                </div>
            </div>
            <div className="charts">
                <div className="top">
                    <div className="metrics-barchart">
                        <BarChart data={problemsSolved}/>
                    </div>
                </div>
                <div className="bottom">
                    <div className="bottom-container">
                        <div className="metrics-piechart">
                            <PieChart data={cntByCategory}/>
                        </div>
                        <div className="metrics-piechart">
                            <PieChart data={cntByCategory}/>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Metrics