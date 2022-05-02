import './SeeSoftSkillQuestions.css'
import { NewActivity } from '../../../../../src/externalClasses'
import {useState, useEffect} from 'react'
import Cards from './Cards'
const baseURL = "http://127.0.0.1:5000"

function SeeSoftSkillQuestions({userData, addActivity, activityIndex, sectionId}) {
    const [questions, setQuestions] = useState([])

    const fetchSoftSkillQuestions = async() => {
        fetch(baseURL + `/soft-skill-question`,{
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setQuestions(data)
        })
    }
    useEffect(() => {
        fetchSoftSkillQuestions()
    }, []);

    function search(rows){
        console.log(rows);
        return rows.filter(
            row => row.title.toLowerCase().indexOf(query.toLowerCase()) > -1
        )
    }

    const [query, setQuery] = useState("");

    const addSoftSkillQuestion = (question, index) => {
        const newAct = NewActivity(question.title, "desc", 3, question.id);
        addActivity(newAct, activityIndex, sectionId);
    }
    return (
        <>
            <div className='see-topics-container'>
                <div className='search_wrap'>
                    <div className='search_box'>
                        <div className='btn btn-common'>
                            <i className='fas fa-search'></i> 
                        </div>
                        <input type="text" className='input' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search ...'></input>
                    </div>
                </div>
                <Cards data={search(questions)} execute={addSoftSkillQuestion}/>
            </div>
        </>
    )
        /*
    return (
        <div className='div-table'>
            <table className='content-table'>
                <thead>
                    <tr>
                    <th>Soft Skills Questions:</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        questions.map((question, index) => 
                            <tr>
                                <td className='tdd'>
                                {question['title']}
                                <IconContext.Provider value={{ color: "#009879", size: '25px' }}>
                                    {
                                    <FiPlus onClick={() => addSoftSkillQuestion(question, index)}/>
                                    }
                                </IconContext.Provider>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
    */
}

export default SeeSoftSkillQuestions