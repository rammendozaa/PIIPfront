import MarkdownRender from "../../MarkDownRender/MarkdownRender";
import './Problem.css'
//import Compiler from "../Compiler.js";
import Compiler2 from "./Compiler2";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import ReactHTMLParser from 'react-html-parser';

function Problem({userData}) {
    const {problem_id} = useParams();
    const [data, setData] = useState();

    useEffect(() => {
        let formData = new FormData();
        formData.append('problem_id', problem_id);
        fetch('/problem',{
            method: "POST",
            headers: {
                "Authorization": 'Bearer ' + userData.token
            },
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            setData(data)
            console.log(data)
        });
    },[]);
    const node = useRef();
    useEffect(() => {
        window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, node.current]);
    });
    const fixHtml = (text) => {
        return text.replaceAll("$$$","$")
    }
    return (
        <>
        {
            data && 
            <div className="problem-container">
                <div className="problem-data">
                    <div className="info">
                        <div className="info-header">
                            <a href={data.url} target="_blank"><h1>{data.title}</h1></a>
                        </div>
                        <dl className="info-body">
                            <div className="problem-info-row">
                                <dt><b>Time Limit:</b></dt>
                                <dd>{data.time_limit}</dd>
                            </div>
                            <div className="problem-info-row">
                                <dt><b>Memory Limit:</b></dt>
                                <dd>{data.memory_limit}</dd>
                            </div>
                            <div className="problem-info-row">
                                <dt><b>Source:</b></dt>
                                <dd>{/*data.source*/}</dd>
                            </div>
                            <div className="problem-info-row">
                                <dt><b>Status:</b></dt>
                                <dd>{/*data.status*/}</dd>
                            </div>
                        </dl>
                    </div>
                    <div className="description" ref={node} key={Math.random()}>
                        <div className="statement">
                            <b>Statement</b>
                            {ReactHTMLParser(fixHtml(data.description))}
                        </div>
                        <div className="inputFormat">
                            <b>Input</b>
                            {ReactHTMLParser(fixHtml(data.input))}
                        </div>
                        <div className="outputFormat">
                            <b>Output</b>
                            {ReactHTMLParser(fixHtml(data.ouput))}
                        </div>
                        <div className="examples">
                            <b>Example</b>
                            {ReactHTMLParser(fixHtml(data.test_cases))}
                        </div>
                    </div>
                </div>
                <div className="problem-execution">
                    <Compiler2 userData={userData} url={data.url}/>
                </div>
            </div>
        }
        </>
    );
}
export default Problem