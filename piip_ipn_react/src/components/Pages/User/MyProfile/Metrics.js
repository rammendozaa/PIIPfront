import BarChart from "./BarChart"
import {useState} from "react"
import PieChart from "./PieChart"

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
        <>
            <h1>Metricas</h1>
            <BarChart data={userData}/>
            <PieChart data={userData}/>
        </>
    )
}

export default Metrics