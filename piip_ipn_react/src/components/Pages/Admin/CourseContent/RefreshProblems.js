const baseURL = "http://127.0.0.1:5000"

function RefreshProblems() {

    const insertProblemsToDatabase = () =>  {
        fetch(baseURL + `/insertProblemsToDB`, {
            method: "GET",
        })
    }

    return (
        <div>
            <h1>Here we refresh prblems</h1>
            <button className="btn-primary" onClick={insertProblemsToDatabase}>Click to refresh</button>
        </div>
    )
}

export default RefreshProblems