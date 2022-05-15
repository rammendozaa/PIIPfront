import { useState } from "react";
import './RefreshProblems.css'
const baseURL = "http://127.0.0.1:5000"

function RefreshProblems() {
    const [waitingMessage, setWaitingMessage] = useState("Click the button below to get the latest problems.");
    const insertProblemsToDatabase = async() =>  {
        setWaitingMessage("Downloading...");
        await fetch(baseURL + `/insertProblemsToDB`, {
            method: "GET",
        })
        setWaitingMessage("Download complete!");
    }

    return (
        <>
            <h1>{waitingMessage}</h1>
            <div className="d-flex-refresh-problems">
                <button className="btn-refresh-problems" onClick={insertProblemsToDatabase}>Click to refresh</button>
            </div>
        </>
    )
}

export default RefreshProblems