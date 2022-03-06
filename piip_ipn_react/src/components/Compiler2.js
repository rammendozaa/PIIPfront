import { useEffect, useState } from "react";
import './Compiler.css'

export const Compiler2 = () => {
    /*fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*',
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                "x-rapidapi-key": "6d48e1f7admshe6ce2e04d511a3dp138316jsn006825e2d1a6"
            },
            body: JSON.stringify({
                language_id: 52,
                source_code: 'I2luY2x1ZGUgPHN0ZGlvLmg+CgppbnQgbWFpbih2b2lkKSB7CiAgY2hhciBuYW1lWzEwXTsKICBzY2FuZigiJXMiLCBuYW1lKTsKICBwcmludGYoImhlbGxvLCAlc1xuIiwgbmFtZSk7CiAgcmV0dXJuIDA7Cn0='
            }),
        }
    )
    .then((response) => response.json())
    .then((data) => console.log('This is your data', data.token));*/
    const [code, setCode] = useState("");
    const [language_id, setLanguageId] = useState(52);
    const [input, setInput] = useState("");
    const [submissionStatus, setSubmissionStatus] = useState("hola")
    const [submissionUrl, setSubmissionUrl] = useState("");
    
    const handleClick = () => {
        console.log("Datos"+input);
        let outputText = document.getElementById("output");
        outputText.innerHTML = "";
        outputText.innerHTML += "Creating Submission ...\n";
        fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*', {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                "x-rapidapi-key": "6d48e1f7admshe6ce2e04d511a3dp138316jsn006825e2d1a6"
            },
            body: JSON.stringify({
                language_id: language_id,
                source_code: btoa(code),
                stdin: btoa(input)
            }),
        })
        .then((response) => response.json())
        .then( (data) => {
            console.log('This is your data', data.token)
            let jsonGetSolution = {
                status: { description: "Queue" },
                stderr: null,
                compile_output: null,
            };
            //while( jsonGetSolution.status.description !== "Accepted" && jsonGetSolution.stderr == null && jsonGetSolution.compile_output == null) {
                let url = `https://judge0-ce.p.rapidapi.com/submissions/${data.token}?base64_encoded=true&fields=*`;
                fetch(url, {
                    method: "GET",
                    headers: {
                        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                        "x-rapidapi-key": "6d48e1f7admshe6ce2e04d511a3dp138316jsn006825e2d1a6"                        
                    },
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log('This is your data', data)
                    if (data.stdout) {
                        const output = atob(data.stdout);
                        outputText.innerHTML = "";
                        outputText.innerHTML += `Results :\n${output}\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`;
                    }else if (data.stderr) {
                        const error = atob(data.stderr);
                        outputText.innerHTML = "";
                        outputText.innerHTML += `\n Error :${error}`;
                    }else {
                        const compilation_error = atob(data.compile_output);
                        outputText.innerHTML = "";
                        outputText.innerHTML += `\n Error :${compilation_error}`;
                    }
                })              
            //}
        }); 
    }
    const submitCode = () => {
        setSubmissionStatus("Submitting ...")
        fetch('/problem/submit')
        .then((response) => response.json())
        .then((data) => {
            setSubmissionUrl(data.submissionUrl)
            console.log(data.submissionUrl)
        })
    }
    useEffect(() => {
        const url = '/submission/?submissionUrl='+submissionUrl
        if("".localeCompare(submissionUrl) != 0){
            fetch(url).then(res => res.json()).then(data => {
                setSubmissionStatus(data.status.verdict)
                console.log("Veredicto: "+data.status.verdict)
            });
        }
    });
    /*return (
        <>
            <div className="row container-fluid">
                <div className="col-6 ml-4 ">
                        <label htmlFor="solution ">
                            <span className="badge badge-info heading mt-2 ">
                                <i className="fas fa-code fa-fw fa-lg"></i> Code Here
                            </span>
                        </label>
                    <textarea
                        required
                        name="solution"
                        id="source"
                        className=" source"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    >
                    </textarea>
                    <button
                        type="submit"
                        className="btn btn-danger ml-2 mr-2 "
                        onClick={handleClick}
                    >
                        <i className="fas fa-cog fa-fw">
                        </i>Run
                    </button>
        
                    <label htmlFor="tags" className="mr-1">
                        <b className="heading">Language:</b>
                    </label>
                    <select
                        id="tags"
                        className="form-control form-inline mb-2 language"
                        value={language_id}
                        onChange={(e) => setLanguageId(e.target.value)}
                    >
                        <option value="54">C++</option>
                        <option value="50">C</option>
                        <option value="62">Java</option>
                        <option value="71">Python</option>
                    </select>
                </div>
                <div className="col-5">
                    <div>
                        <span className="badge badge-info heading my-2 ">
                            <i className="fas fa-exclamation fa-fw fa-md"></i> Output
                        </span>
                        <textarea id="output"></textarea>
                    </div>
                </div>
            </div>
            <div className="mt-2 ml-5">
                <span className="badge badge-primary heading my-2 ">
                    <i className="fas fa-user fa-fw fa-md"></i> User Input
                </span>
                <br />
                <textarea
                    id="input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}>
                </textarea>
            </div>
        </>
    );*/
    return (
        <div className="compiler">
            <div className="compiler-toolbar">
                <label htmlFor="tags">
                    <b className="heading">Language:</b>
                </label>
                <select
                    id="tags"
                    className="language"
                    value={language_id}
                    onChange={(e) => setLanguageId(e.target.value)}
                >
                    <option value="54">C++</option>
                    <option value="50">C</option>
                    <option value="62">Java</option>
                    <option value="71">Python</option>
                </select>
            </div>
            <div className="editor">
                <textarea
                    required
                    name="solution"
                    id="source"
                    className=" source"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                >
                </textarea>
                <textarea id="output" className="output"></textarea>
            </div>
            <div className="compiler-footbar">
                <div className="left">
                    <textarea
                        id="input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}>
                    </textarea>
                    <a href={submissionUrl}>See submision</a>
                    <p>{submissionStatus}</p>
                </div>
                <div className="right">
                    <button
                        type="run"
                        className="btn runCode"
                        onClick={handleClick}
                    >
                    Run
                    </button>
                    <button
                        type="submit"
                        className="btn submitCode"
                        onClick={submitCode}
                    >
                    Submit
                    </button>
                </div>
            </div> 
        </div>
    )
};

export default Compiler2;